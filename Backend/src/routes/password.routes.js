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
 */
router.post("/check", checkPassword);

// POST /api/v1/password/generate — produce one or more strong random passwords.
/**
 * @openapi
 * /api/v1/password/generate:
 *   post:
 *     summary: Generate one or more strong random passwords
 *     tags: [Password]
 */
router.post("/generate", generatePassword);

export default router;
