import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import session from "express-session";
import MemoryStore from "memorystore";
import { MicrosoftAadStrategy } from "passport-azure-ad";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { isAuthenticated, findOrCreateUser } from "./middleware/auth";

if (!process.env.MICROSOFT_CLIENT_ID || !process.env.MICROSOFT_CLIENT_SECRET) {
  throw new Error("Microsoft SSO credentials not found in environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google SSO credentials not found in environment variables");
}

const SESSION_SECRET = process.env.SESSION_SECRET || "your-session-secret";

export function registerRoutes(app: Express): Server {
  // Session configuration
  const SessionStore = MemoryStore(session);
  app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport serialization
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      // TODO: Implement user lookup from database
      done(null, { id });
    } catch (error) {
      done(error, null);
    }
  });

  // Microsoft Entra ID Strategy
  passport.use(new MicrosoftAadStrategy({
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    callbackURL: "/api/auth/microsoft/callback",
    tenant: "common",
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const user = await findOrCreateUser(profile, "microsoft");
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // Google OAuth2.0 Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      const user = await findOrCreateUser(profile, "google");
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  // Authentication Routes
  app.get("/api/auth/microsoft",
    passport.authenticate("azure-ad-openidconnect", { prompt: "select_account" })
  );

  app.get("/api/auth/microsoft/callback",
    passport.authenticate("azure-ad-openidconnect", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/")
  );

  app.get("/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/")
  );

  // AWS Cognito endpoints will be implemented separately with the AWS SDK

  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/login");
    });
  });

  // Protected API routes
  app.get("/api/user", isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  const httpServer = createServer(app);
  return httpServer;
}