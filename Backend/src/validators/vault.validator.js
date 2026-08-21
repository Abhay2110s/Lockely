// Vault validators — Zod schemas for request body validation
// across vault CRUD operations and CSV/JSON import.
import { z } from "zod";

export const createPasswordSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required."),
    website: z.string().trim().optional().default(""),
    url: z.string().trim().optional().default(""),
    icon: z.string().trim().optional().default(""),
    username: z.string().trim().optional().default(""),
    email: z.string().trim().optional().default(""),
    // Zero-knowledge client-encrypted payload
    cipherText: z.string().optional(),
    iv: z.string().optional(),
    authTag: z.string().optional(),
    passwordHash: z.string().optional(),
    strength: z
      .object({
        score: z.number().optional(),
        label: z.string().optional(),
        entropy: z.number().optional(),
      })
      .optional(),
    // Legacy password support (for CSV/JSON import)
    password: z.string().optional(),
    notes: z.string().max(1000).optional().default(""),
    recoveryEmail: z.string().trim().optional().default(""),
    backupCodes: z.union([z.array(z.string()), z.record(z.any()), z.null()]).optional(),
    category: z.string().trim().optional().default("General"),
    favorite: z.boolean().optional().default(false),
    expiryDays: z.number().int().positive().optional(),
  })
  .refine(
    (data) =>
      Boolean(data.cipherText && data.iv && data.authTag && data.passwordHash) ||
      Boolean(data.password),
    {
      message: "Encrypted password blob or password is required.",
    }
  );

export const updatePasswordSchema = z.object({
  title: z.string().trim().min(1).optional(),
  website: z.string().trim().optional(),
  url: z.string().trim().optional(),
  icon: z.string().trim().optional(),
  username: z.string().trim().optional(),
  email: z.string().trim().optional(),
  cipherText: z.string().optional(),
  iv: z.string().optional(),
  authTag: z.string().optional(),
  passwordHash: z.string().optional(),
  strength: z
    .object({
      score: z.number().optional(),
      label: z.string().optional(),
      entropy: z.number().optional(),
    })
    .optional(),
  password: z.string().min(1).optional(),
  notes: z.string().max(1000).optional(),
  recoveryEmail: z.string().trim().optional(),
  backupCodes: z.union([z.array(z.string()), z.record(z.any()), z.null()]).optional(),
  category: z.string().trim().optional(),
  favorite: z.boolean().optional(),
  expiryDays: z.number().int().positive().optional(),
});

export const importSchema = z.object({
  format: z.enum(["csv", "json"]),
  data: z.string().min(1, "Import data is required."),
});
