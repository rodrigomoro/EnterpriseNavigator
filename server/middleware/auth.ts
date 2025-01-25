import { Request, Response, NextFunction } from "express";
import { db } from "@db";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      provider: string;
      providerId: string;
    }
  }
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export async function findOrCreateUser(profile: any, provider: string) {
  const providerId = profile.id;
  const email = profile.emails?.[0]?.value;
  
  if (!email) {
    throw new Error("Email is required");
  }

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, email),
  });

  if (existingUser) {
    return existingUser;
  }

  // Create new user
  const [newUser] = await db.insert(users).values({
    username: email,
    provider,
    providerId,
  }).returning();

  return newUser;
}
