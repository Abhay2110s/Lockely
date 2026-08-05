// Vault routes — CRUD operations for encrypted password entries.
// All vault routes require authentication (verifyToken is applied
// globally via router.use below).
import express from "express";
import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createPasswordSchema,
  updatePasswordSchema,
  importSchema,
} from "../validators/vault.validator.js";
import * as vaultController from "../controllers/vault.controller.js";

const router = express.Router();

// Apply authentication to every route in this router.
router.use(verifyToken);

// GET /api/v1/vault/dashboard — security dashboard statistics.
/**
 * @openapi
 * /api/v1/vault/dashboard:
 *   get:
 *     summary: Get vault security dashboard statistics
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Dashboard stats }
 */
router.get("/dashboard", vaultController.getDashboardStats);

// Read-only endpoints for reuse detection, favorites, and categories.
router.get("/reused", vaultController.getReusedPasswords);
router.get("/favorites", vaultController.getFavorites);
router.get("/categories", vaultController.getCategories);
router.get("/export", vaultController.exportPasswords);
router.post("/import", validate(importSchema), vaultController.importPasswords);

// CRUD for vault entries: create, list, read, update, delete.
/**
 * @openapi
 * /api/v1/vault:
 *   post:
 *     summary: Save a new password to the vault
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       201: { description: Password saved }
 *   get:
 *     summary: List vault passwords (search, filter, sort, paginate)
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: favorite
 *         schema: { type: boolean }
 *       - in: query
 *         name: weak
 *         schema: { type: boolean }
 *       - in: query
 *         name: expired
 *         schema: { type: boolean }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [latest, oldest, alphabetical, strength] }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Paginated vault entries }
 */
router
   .route("/")
   .post(validate(createPasswordSchema), vaultController.createPassword)
   .get(vaultController.getAllPasswords);

// Single-entry operations: read, update, delete by ID.
/**
 * @openapi
 * /api/v1/vault/{id}:
 *   get:
 *     summary: Get a single vault entry by id (add ?reveal=true to decrypt)
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *   put:
 *     summary: Update a vault entry
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     summary: Permanently delete a vault entry
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 */
router
   .route("/:id")
   .get(vaultController.getPasswordById)
   .put(validate(updatePasswordSchema), vaultController.updatePassword)
   .delete(vaultController.deletePassword);

// Partial-update endpoints for favorite toggle and soft delete / restore.
router.patch("/:id/favorite", vaultController.toggleFavorite);
router.patch("/:id/soft-delete", vaultController.softDeletePassword);
router.patch("/:id/restore", vaultController.restorePassword);

export default router;
