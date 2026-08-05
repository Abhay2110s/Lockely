// Vault validators — Zod schemas for request body validation
// across vault CRUD operations and CSV/JSON import.
import { z } from "zod";

export const createPasswordSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  website: z.string().trim().optional().default(""),
  url: z.string().trim().optional().default(""),
  icon: z.string().trim().optional().default(""),
  username: z.string().trim().optional().default(""),
  email: z.string().trim().optional().default(""),
  password: z.string().min(1, "Password is required."),
  notes: z.string().max(1000).optional().default(""),
  recoveryEmail: z.string().trim().optional().default(""),
  backupCodes: z.array(z.string()).optional().default([]),
  category: z.string().trim().optional().default("General"),
  favorite: z.boolean().optional().default(false),
  expiryDays: z.number().int().positive().optional(),
});

export const updatePasswordSchema = createPasswordSchema.partial().extend({
  // password stays optional on update; when omitted, secret is unchanged
  password: z.string().min(1).optional(),
});

export const importSchema = z.object({
  format: z.enum(["csv", "json"]),
  data: z.string().min(1, "Import data is required."),
});
