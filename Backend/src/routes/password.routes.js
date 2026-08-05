// Password routes — endpoints for checking password strength and
// generating random passwords.
import express from "express";
import { checkPassword, generatePassword } from "../controllers/password.controller.js";

const router = express.Router();

// POST /api/v1/password/check — evaluate the strength of a password.
/**
 * @openapi
 * /api/v1/password/check:
 *   post:
 *     summary: Check password strength (score, entropy, crack time, feedback)
 *     tags: [Password]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password: { type: string }
 *     responses:
 *       200: { description: Strength analysis }
 *       400: { description: Password is required }
 */
router.post("/check", checkPassword);

// POST /api/v1/password/generate — produce one or more strong random passwords.
/**
 * @openapi
 * /api/v1/password/generate:
 *   post:
 *     summary: Generate one or more strong random passwords
 *     tags: [Password]
 *     security: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               length: { type: integer, minimum: 8, maximum: 64, default: 16 }
 *               count: { type: integer, minimum: 1, maximum: 20, default: 5 }
 *               uppercase: { type: boolean, default: true }
 *               lowercase: { type: boolean, default: true }
 *               numbers: { type: boolean, default: true }
 *               symbols: { type: boolean, default: true }
 *               excludeSimilar: { type: boolean, default: false }
 *     responses:
 *       200: { description: Generated passwords }
 *       400: { description: Length or count out of allowed range }
 */
router.post("/generate", generatePassword);

export default router;
