// Folder validators — Zod schemas for request body validation
// across folder CRUD operations.
import { z } from "zod";

export const createFolderSchema = z.object({
  name: z.string().trim().min(1, "Folder name is required.").max(60),
  icon: z.string().trim().optional().default(""),
  color: z.string().trim().optional().default(""),
});

export const updateFolderSchema = createFolderSchema.partial();
