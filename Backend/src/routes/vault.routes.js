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
 *     description: >
 *       Returns totals, weak/strong/favorite/expired counts, average
 *       entropy, reuse counts, and an overall 0-100 security score.
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Dashboard stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPasswords: { type: integer }
 *                 weakPasswords: { type: integer }
 *                 strongPasswords: { type: integer }
 *                 favoritePasswords: { type: integer }
 *                 averageEntropy: { type: number }
 *                 reusedPasswords: { type: integer }
 *                 reusedGroups: { type: integer }
 *                 expiredPasswords: { type: integer }
 *                 securityScore: { type: integer }
 */
router.get("/dashboard", vaultController.getDashboardStats);

// GET /api/v1/vault/reused — groups of entries that share the same password.
/**
 * @openapi
 * /api/v1/vault/reused:
 *   get:
 *     summary: Get groups of vault entries that reuse the same password
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Reused password groups }
 */
router.get("/reused", vaultController.getReusedPasswords);

// GET /api/v1/vault/favorites — all favorited entries.
/**
 * @openapi
 * /api/v1/vault/favorites:
 *   get:
 *     summary: List all favorite vault entries
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Favorite entries }
 */
router.get("/favorites", vaultController.getFavorites);

// GET /api/v1/vault/categories — distinct categories in use.
/**
 * @openapi
 * /api/v1/vault/categories:
 *   get:
 *     summary: List the distinct categories used across the vault
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Category list }
 */
router.get("/categories", vaultController.getCategories);

// GET /api/v1/vault/export — export the vault as JSON or CSV.
/**
 * @openapi
 * /api/v1/vault/export:
 *   get:
 *     summary: Export all vault entries (decrypted) as JSON or CSV
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: format
 *         schema: { type: string, enum: [json, csv], default: json }
 *     responses:
 *       200:
 *         description: File download containing decrypted vault entries
 */
router.get("/export", vaultController.exportPasswords);

// GET /api/v1/vault/export-encrypted — export encrypted vault backup.
router.get("/export-encrypted", vaultController.exportEncryptedPasswords);

// POST /api/v1/vault/import — bulk-import entries from JSON or CSV.
/**
 * @openapi
 * /api/v1/vault/import:
 *   post:
 *     summary: Import vault entries from a JSON or CSV payload
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [format, data]
 *             properties:
 *               format: { type: string, enum: [json, csv] }
 *               data: { type: string, description: Raw JSON array or CSV text }
 *     responses:
 *       200: { description: "Import summary: imported / failed / errors" }
 */
router.post("/import", validate(importSchema), vaultController.importPasswords);

// CRUD for vault entries: create, list, read, update, delete.
/**
 * @openapi
 * /api/v1/vault:
 *   post:
 *     summary: Save a new password to the vault
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, password]
 *             properties:
 *               title: { type: string }
 *               website: { type: string }
 *               url: { type: string }
 *               icon: { type: string }
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               notes: { type: string }
 *               recoveryEmail: { type: string }
 *               backupCodes: { type: array, items: { type: string } }
 *               category: { type: string, default: General }
 *               favorite: { type: boolean, default: false }
 *               expiryDays: { type: integer }
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
 *         description: Matches against title, website, username, and category
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: favorite
 *         schema: { type: boolean }
 *       - in: query
 *         name: weak
 *         schema: { type: boolean }
 *         description: Only entries with Weak/Very Weak strength
 *       - in: query
 *         name: expired
 *         schema: { type: boolean }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [latest, oldest, alphabetical, strength] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *         description: Capped at 100
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: reveal
 *         schema: { type: boolean }
 *     responses:
 *       200: { description: Vault entry }
 *       404: { description: Password entry not found }
 *   put:
 *     summary: Update a vault entry
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Any subset of the create-entry fields
 *     responses:
 *       200: { description: Password updated }
 *       400: { description: Password was used before (reuse blocked) }
 *       404: { description: Password entry not found }
 *   delete:
 *     summary: Permanently delete a vault entry
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Password permanently deleted }
 *       404: { description: Password entry not found }
 */
router
   .route("/:id")
   .get(vaultController.getPasswordById)
   .put(validate(updatePasswordSchema), vaultController.updatePassword)
   .delete(vaultController.deletePassword);

// Partial-update endpoints for favorite toggle and soft delete / restore.
/**
 * @openapi
 * /api/v1/vault/{id}/favorite:
 *   patch:
 *     summary: Toggle (or explicitly set) an entry's favorite status
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favorite: { type: boolean, description: Omit to toggle the current value }
 *     responses:
 *       200: { description: Favorite status updated }
 */
router.patch("/:id/favorite", vaultController.toggleFavorite);

/**
 * @openapi
 * /api/v1/vault/{id}/soft-delete:
 *   patch:
 *     summary: Move an entry to trash (soft delete)
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Password moved to trash }
 */
router.patch("/:id/soft-delete", vaultController.softDeletePassword);

/**
 * @openapi
 * /api/v1/vault/{id}/restore:
 *   patch:
 *     summary: Restore a soft-deleted entry from trash
 *     tags: [Vault]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Password restored successfully }
 */
router.patch("/:id/restore", vaultController.restorePassword);

export default router;
