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
 */
router.post("/register", authLimiter, validate(registerSchema), authController.register);

// POST /api/v1/auth/resend-verification-otp — resend the email-verification OTP.
router.post(
  "/resend-verification-otp",
  otpLimiter,
  validate(resendOtpSchema),
  authController.resendVerificationOtp
);

// POST /api/v1/auth/verify-email-otp — confirm the email-verification OTP.
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
 */
router.post("/login", authLimiter, validate(loginSchema), authController.login);

// POST /api/v1/auth/verify-login-otp — confirm the login OTP and receive a JWT.
router.post(
  "/verify-login-otp",
  authLimiter,
  validate(verifyLoginOtpSchema),
  authController.verifyLoginOTP
);

// POST /api/v1/auth/forgot-password — send a password-reset link to the user's email.
router.post(
  "/forgot-password",
  otpLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

// POST /api/v1/auth/reset-password — complete the password reset using the token from the email link.
router.post(
  "/reset-password",
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

// POST /api/v1/auth/logout — clear the JWT cookie.
router.post("/logout", verifyToken, authController.logout);

// GET /api/v1/auth/profile — fetch the authenticated user's profile.
router.get("/profile", verifyToken, authController.profile);

export default router;
