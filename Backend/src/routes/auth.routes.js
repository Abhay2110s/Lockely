// Auth routes — Clerk owns sign-up, sign-in, email verification, and
// password reset entirely on the frontend. These two endpoints just
// keep a local profile mirror in sync and expose the current session.
import express from "express";
import * as authController from "../controllers/auth.controller.js";
import verifyAuth from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/v1/auth/sync — upsert the local profile mirror after a
// Clerk sign-in/sign-up on the frontend.
/**
 * @openapi
 * /api/v1/auth/sync:
 *   post:
 *     summary: Sync the local user profile after Clerk sign-in/sign-up
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: User synced }
 */
router.post("/sync", verifyAuth, authController.sync);

// GET /api/v1/auth/session — the current Clerk identity + local profile.
/**
 * @openapi
 * /api/v1/auth/session:
 *   get:
 *     summary: Get the current authenticated session + local profile
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Session fetched }
 *       401: { description: Unauthorized }
 */
router.get("/session", verifyAuth, authController.session);

export default router;
