import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tax form schema
export const taxForms = pgTable("tax_forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  countryCode: varchar("country_code", { length: 3 }).notNull(),
  formType: varchar("form_type", { length: 50 }).notNull(),
  taxYear: integer("tax_year").notNull(),
  formData: jsonb("form_data").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  language: varchar("language", { length: 5 }).notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Country tax configuration schema
export const countryConfigs = pgTable("country_configs", {
  id: varchar("id").primaryKey(),
  countryCode: varchar("country_code", { length: 3 }).notNull().unique(),
  countryName: jsonb("country_name").notNull(), // { en: "United States", es: "Estados Unidos", etc }
  currency: varchar("currency", { length: 3 }).notNull(),
  currencySymbol: varchar("currency_symbol", { length: 5 }).notNull(),
  taxForms: jsonb("tax_forms").notNull(), // Array of available form types
  deductions: jsonb("deductions").notNull(), // Array of available deductions
  credits: jsonb("credits").notNull(), // Array of available credits
});

// AI assistance request schema
export const aiAssistanceRequests = pgTable("ai_assistance_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  formId: varchar("form_id").notNull(),
  question: text("question").notNull(),
  response: text("response"),
  language: varchar("language", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertTaxFormSchema = createInsertSchema(taxForms).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  countryCode: z.string().length(2).or(z.string().length(3)),
  formType: z.string().min(1),
  taxYear: z.number().int().min(1900).max(2100),
  formData: z.record(z.any()),
  status: z.enum(["draft", "completed", "submitted"]).default("draft"),
  language: z.string().min(2).max(5),
});

export const insertCountryConfigSchema = createInsertSchema(countryConfigs).omit({
  id: true,
});

export const insertAiAssistanceRequestSchema = createInsertSchema(aiAssistanceRequests).omit({
  id: true,
  createdAt: true,
});

// TypeScript types
export type TaxForm = typeof taxForms.$inferSelect;
export type InsertTaxForm = z.infer<typeof insertTaxFormSchema>;
export type CountryConfig = typeof countryConfigs.$inferSelect;
export type InsertCountryConfig = z.infer<typeof insertCountryConfigSchema>;
export type AiAssistanceRequest = typeof aiAssistanceRequests.$inferSelect;
export type InsertAiAssistanceRequest = z.infer<typeof insertAiAssistanceRequestSchema>;

// Additional types for the application
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Country {
  code: string;
  name: Record<string, string>;
  currency: string;
  currencySymbol: string;
  flagEmoji: string;
}

export interface FormField {
  id: string;
  type: "text" | "number" | "currency" | "date" | "select" | "checkbox" | "radio";
  label: Record<string, string>;
  placeholder?: Record<string, string>;
  helpText?: Record<string, string>;
  required?: boolean;
  options?: Array<{ value: string; label: Record<string, string> }>;
  validation?: z.ZodSchema;
}

export interface TaxFormSection {
  id: string;
  title: Record<string, string>;
  description?: Record<string, string>;
  fields: FormField[];
}

export interface TaxFormTemplate {
  formType: string;
  countryCode: string;
  title: Record<string, string>;
  description: Record<string, string>;
  sections: TaxFormSection[];
}
