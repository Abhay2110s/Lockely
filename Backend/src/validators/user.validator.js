// User validators — Zod schemas for profile and security-preference updates.
import { z } from "zod";

export const updateProfileSchema = z.object({
  displayName: z.string().trim().max(60).optional(),
  bio: z.string().trim().max(280).optional(),
  preferredLanguage: z.string().trim().max(10).optional(),
});

export const securityPreferencesSchema = z.object({
  autoLockMinutes: z.number().int().min(0).max(1440).optional(),
  clipboardClearSeconds: z.number().int().min(0).max(300).optional(),
  enable2FA: z.boolean().optional(),
});
