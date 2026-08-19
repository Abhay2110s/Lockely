// User routes — profile, security preferences, stats, and account
// deletion. All routes require authentication.
import express from "express";
import verifyAuth from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { updateProfileSchema, securityPreferencesSchema } from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.use(verifyAuth);

/**
 * @openapi
 * /api/v1/users/me/security-preferences:
 *   get:
 *     summary: Get the authenticated user's security preferences
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Security preferences }
 *   put:
 *     summary: Update security preferences (auto-lock, clipboard clear, 2FA)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               autoLockMinutes: { type: integer }
 *               clipboardClearSeconds: { type: integer }
 *               enable2FA: { type: boolean }
 *     responses:
 *       200: { description: Security preferences updated }
 */
router
  .route("/me/security-preferences")
  .get(userController.getSecurityPreferences)
  .put(validate(securityPreferencesSchema), userController.updateSecurityPreferences);

/**
 * @openapi
 * /api/v1/users/me/stats:
 *   get:
 *     summary: Get dashboard statistics for the authenticated user
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Dashboard stats (same shape as /vault/dashboard) }
 */
router.get("/me/stats", userController.getStats);

/**
 * @openapi
 * /api/v1/users/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: User profile }
 *   put:
 *     summary: Update profile fields (displayName, bio, preferredLanguage)
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName: { type: string }
 *               bio: { type: string }
 *               preferredLanguage: { type: string }
 *     responses:
 *       200: { description: Profile updated }
 *   delete:
 *     summary: Permanently delete the account and all owned data
 *     tags: [Users]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Account deleted }
 */
router
  .route("/me")
  .get(userController.getProfile)
  .put(validate(updateProfileSchema), userController.updateProfile)
  .delete(userController.deleteAccount);

export default router;
