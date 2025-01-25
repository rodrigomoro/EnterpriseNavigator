import { pgTable, text, serial, integer, boolean, timestamp, foreignKey, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Academic Programs table
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  duration: integer("duration"), // in months
  isActive: boolean("is_active").default(true),
});

// Student Enrollments table
export const studentEnrollments = pgTable("student_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  programId: integer("program_id").notNull().references(() => programs.id),
  status: text("status").notNull(), // "active", "completed", "withdrawn"
  enrollmentDate: timestamp("enrollment_date").default(sql`CURRENT_TIMESTAMP`),
  completionDate: timestamp("completion_date"),
  source: text("source"), // CRM source: "direct", "referral", "website"
});

// Certifications table
export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  programId: integer("program_id").notNull().references(() => programs.id),
  name: text("name").notNull(),
  issueDate: timestamp("issue_date").default(sql`CURRENT_TIMESTAMP`),
  expiryDate: timestamp("expiry_date"),
  certificateUrl: text("certificate_url"),
});

// Academic Scores table
export const academicScores = pgTable("academic_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  programId: integer("program_id").notNull().references(() => programs.id),
  assessmentName: text("assessment_name").notNull(),
  score: decimal("score").notNull(),
  maxScore: decimal("max_score").notNull(),
  assessmentDate: timestamp("assessment_date").default(sql`CURRENT_TIMESTAMP`),
  notes: text("notes"),
});

// Create Zod schemas for type safety
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertProgramSchema = createInsertSchema(programs);
export const selectProgramSchema = createSelectSchema(programs);
export const insertEnrollmentSchema = createInsertSchema(studentEnrollments);
export const selectEnrollmentSchema = createSelectSchema(studentEnrollments);
export const insertCertificationSchema = createInsertSchema(certifications);
export const selectCertificationSchema = createSelectSchema(certifications);
export const insertScoreSchema = createInsertSchema(academicScores);
export const selectScoreSchema = createSelectSchema(academicScores);

// Export types
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertProgram = typeof programs.$inferInsert;
export type SelectProgram = typeof programs.$inferSelect;
export type InsertEnrollment = typeof studentEnrollments.$inferInsert;
export type SelectEnrollment = typeof studentEnrollments.$inferSelect;
export type InsertCertification = typeof certifications.$inferInsert;
export type SelectCertification = typeof certifications.$inferSelect;
export type InsertScore = typeof academicScores.$inferInsert;
export type SelectScore = typeof academicScores.$inferSelect;