// Auth validators — Zod schemas for request body validation
// across registration, login, OTP verification, and password reset.
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const verifyEmailOtpSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  otp: z.string().length(6),
});

export const resendOtpSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
});

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10, "Reset token is required."),
  email: z.string().trim().email().toLowerCase(),
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
});
