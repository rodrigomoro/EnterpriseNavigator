import { pgTable, text, serial, integer, boolean, timestamp, decimal, uuid, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

// Invoice table following Spanish law requirements
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").unique().notNull(),
  // Required unique identifier for AEAT
  aeatId: uuid("aeat_id").defaultRandom().notNull(),
  issuerId: integer("issuer_id").references(() => users.id).notNull(),
  recipientId: integer("recipient_id").references(() => users.id).notNull(),
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
  // Digital signature as per RD 1007/2023
  digitalSignature: text("digital_signature"),
  signatureDate: timestamp("signature_date"),
  // QR code data for verification
  qrCode: text("qr_code"),
  // PDF attachment for transitional compliance
  pdfUrl: text("pdf_url"),
  // Additional metadata required by AEAT
  metadata: jsonb("metadata"),
  status: text("status").notNull().default('draft'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Invoice items
export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").references(() => invoices.id).notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});

// AEAT submission tracking
export const invoiceSubmissions = pgTable("invoice_submissions", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").references(() => invoices.id).notNull(),
  submissionDate: timestamp("submission_date").defaultNow().notNull(),
  status: text("status").notNull(), // pending, accepted, rejected
  responseCode: text("response_code"),
  responseMessage: text("response_message"),
  retryCount: integer("retry_count").default(0),
});

// Define relations
export const invoiceRelations = relations(invoices, ({ many, one }) => ({
  items: many(invoiceItems),
  submissions: many(invoiceSubmissions),
  issuer: one(users, {
    fields: [invoices.issuerId],
    references: [users.id],
  }),
  recipient: one(users, {
    fields: [invoices.recipientId],
    references: [users.id],
  }),
}));

// Create Zod schemas for type safety
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertInvoiceSchema = createInsertSchema(invoices);
export const selectInvoiceSchema = createSelectSchema(invoices);
export const insertInvoiceItemSchema = createInsertSchema(invoiceItems);
export const selectInvoiceItemSchema = createSelectSchema(invoiceItems);
export const insertInvoiceSubmissionSchema = createInsertSchema(invoiceSubmissions);
export const selectInvoiceSubmissionSchema = createSelectSchema(invoiceSubmissions);

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type InsertInvoiceItem = typeof invoiceItems.$inferInsert;
export type InvoiceSubmission = typeof invoiceSubmissions.$inferSelect;
export type InsertInvoiceSubmission = typeof invoiceSubmissions.$inferInsert;