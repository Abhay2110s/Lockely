// Auth routes — registration, login, OTP verification, password reset,
// and profile endpoints. Each route is protected by rate limiters and
// Zod validation before hitting the controller.
import express from "express";
import * as authController from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { authLimiter, otpLimiter } from "../middleware/rateLimiter.middleware.js";
import {
  registerSchema,
  verifyEmailOtpSchema,
  resendOtpSchema,
  loginSchema,
  verifyLoginOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/auth.validator.js";

const router = express.Router();

// POST /api/v1/auth/register — create a new account and send a verification OTP.
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user (sends email verification OTP)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, minLength: 3, maxLength: 50 }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *     responses:
 *       201: { description: Registered — verification OTP emailed }
 *       409: { description: User already exists }
 */
router.post("/register", authLimiter, validate(registerSchema), authController.register);

// POST /api/v1/auth/resend-verification-otp — resend the email-verification OTP.
/**
 * @openapi
 * /api/v1/auth/resend-verification-otp:
 *   post:
 *     summary: Resend the email-verification OTP
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: OTP resent }
 *       400: { description: Email already verified }
 *       404: { description: User not found }
 */
router.post(
  "/resend-verification-otp",
  otpLimiter,
  validate(resendOtpSchema),
  authController.resendVerificationOtp
);

// POST /api/v1/auth/verify-email-otp — confirm the email-verification OTP.
/**
 * @openapi
 * /api/v1/auth/verify-email-otp:
 *   post:
 *     summary: Verify a user's email using the OTP sent at registration
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string, format: email }
 *               otp: { type: string, minLength: 6, maxLength: 6 }
 *     responses:
 *       200: { description: Email verified }
 *       400: { description: Invalid or expired OTP }
 */
router.post(
  "/verify-email-otp",
  authLimiter,
  validate(verifyEmailOtpSchema),
  authController.verifyEmailOTP
);

// POST /api/v1/auth/login — authenticate with email+password and receive a login OTP.
/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in with email + password (sends login OTP)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login OTP sent to email }
 *       401: { description: Invalid password, or email not verified yet }
 *       404: { description: User not found }
 */
router.post("/login", authLimiter, validate(loginSchema), authController.login);

// POST /api/v1/auth/verify-login-otp — confirm the login OTP and receive a JWT.
/**
 * @openapi
 * /api/v1/auth/verify-login-otp:
 *   post:
 *     summary: Verify the login OTP and receive a JWT (also set as an httpOnly cookie)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string, format: email }
 *               otp: { type: string, minLength: 6, maxLength: 6 }
 *     responses:
 *       200: { description: Login successful — returns JWT + user profile }
 *       400: { description: Invalid or expired OTP }
 */
router.post(
  "/verify-login-otp",
  authLimiter,
  validate(verifyLoginOtpSchema),
  authController.verifyLoginOTP
);

// POST /api/v1/auth/forgot-password — send a password-reset link to the user's email.
/**
 * @openapi
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Request a password-reset link
 *     description: >
 *       Always returns 200 with a generic message, whether or not the email
 *       is registered, to avoid leaking which emails have accounts.
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200: { description: Generic confirmation message }
 */
router.post(
  "/forgot-password",
  otpLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

// POST /api/v1/auth/reset-password — complete the password reset using the token from the email link.
/**
 * @openapi
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password using the token from the emailed reset link
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, token, newPassword]
 *             properties:
 *               email: { type: string, format: email }
 *               token: { type: string, description: Raw token from the reset link query string }
 *               newPassword: { type: string, minLength: 8 }
 *     responses:
 *       200: { description: Password reset successfully }
 *       400: { description: Reset link is invalid or has expired }
 */
router.post(
  "/reset-password",
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

// POST /api/v1/auth/logout — clear the JWT cookie.
/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     summary: Log out (clears the JWT cookie)
 *     tags: [Auth]
 *     responses:
 *       200: { description: Logged out successfully }
 *       401: { description: Unauthorized }
 */
router.post("/logout", verifyToken, authController.logout);

// GET /api/v1/auth/profile — fetch the authenticated user's profile.
/**
 * @openapi
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Auth]
 *     responses:
 *       200: { description: Profile fetched successfully }
 *       401: { description: Unauthorized }
 *       404: { description: User not found }
 */
router.get("/profile", verifyToken, authController.profile);

export default router;
