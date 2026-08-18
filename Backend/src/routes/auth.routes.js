// Auth routes — manual email/password authentication with JWT.
// All sign-up, login, OTP verification, and password-reset flows
// are handled here. Protected routes use verifyAuth middleware.
import express from "express";
import * as authController from "../controllers/auth.controller.js";
import verifyAuth from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/v1/auth/register — create account, send verification OTP
router.post("/register", authController.register);

// POST /api/v1/auth/verify-otp — verify email OTP, activate account, return JWT
router.post("/verify-otp", authController.verifyOTP);

// POST /api/v1/auth/login — email + password login, return JWT
router.post("/login", authController.login);

// POST /api/v1/auth/forgot-password — send password-reset OTP
router.post("/forgot-password", authController.forgotPassword);

// POST /api/v1/auth/reset-password — verify reset OTP + set new password
router.post("/reset-password", authController.resetPassword);

// POST /api/v1/auth/resend-otp — resend verification or reset OTP
router.post("/resend-otp", authController.resendOTP);

// GET /api/v1/auth/me — return the authenticated user's profile
router.get("/me", verifyAuth, authController.getMe);

export default router;
