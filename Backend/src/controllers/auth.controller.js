// Auth controller — full manual auth: register, OTP verify, login,
// forgot-password, reset-password, and get-me.
// No third-party auth provider is used; credentials are stored locally.
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import OTP from "../models/otp.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";
import { sendOTPEmail } from "../services/email.service.js";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generate a cryptographically secure 6-digit OTP string. */
const generateOTP = () =>
  String(crypto.randomInt(100000, 999999));

/** Sign a JWT for the given user _id. */
const signToken = (userId) =>
  jwt.sign({ userId: userId.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

// ─── Register ───────────────────────────────────────────────────────────────

// POST /api/v1/auth/register
// Creates an unverified account and sends an OTP to the user's email.
export const register = asyncHandler(async (req, res) => {
  const { name = "", email, password } = req.body || {};

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required.");
  }
  if (password.length < 8) {
    throw ApiError.badRequest("Password must be at least 8 characters.");
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing && existing.isVerified) {
    throw ApiError.conflict("An account with this email already exists.");
  }

  // If there's an unverified stale account, delete it and start fresh.
  if (existing && !existing.isVerified) {
    await User.deleteOne({ _id: existing._id });
    await OTP.deleteMany({ email: email.toLowerCase(), type: "EMAIL_VERIFICATION" });
  }

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    password,
    isVerified: false,
  });

  const otp = generateOTP();
  await OTP.create({
    email: email.toLowerCase(),
    otp,
    type: "EMAIL_VERIFICATION",
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 min
  });

  await sendOTPEmail(email, otp, "verify");

  return new ApiResponse(201, "Account created. Check your email for the verification code.", {
    email: user.email,
  }).send(res);
});

// ─── Verify OTP ─────────────────────────────────────────────────────────────

// POST /api/v1/auth/verify-otp
// Verifies the email OTP and activates the account, returning a JWT.
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    throw ApiError.badRequest("Email and OTP are required.");
  }

  const record = await OTP.findOne({
    email: email.toLowerCase(),
    otp,
    type: "EMAIL_VERIFICATION",
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    throw ApiError.badRequest("Invalid or expired verification code.");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw ApiError.notFound("User not found.");
  }

  user.isVerified = true;
  await user.save();

  await OTP.deleteMany({ email: email.toLowerCase(), type: "EMAIL_VERIFICATION" });

  const token = signToken(user._id);

  return new ApiResponse(200, "Email verified successfully.", {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  }).send(res);
});

// ─── Login ───────────────────────────────────────────────────────────────────

// POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required.");
  }

  // Re-select password since the schema hides it by default.
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized("Invalid email or password.");
  }

  if (!user.isVerified) {
    // Re-send a fresh OTP so the user can complete verification.
    const otp = generateOTP();
    await OTP.deleteMany({ email: email.toLowerCase(), type: "EMAIL_VERIFICATION" });
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      type: "EMAIL_VERIFICATION",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await sendOTPEmail(email, otp, "verify");

    throw ApiError.forbidden(
      "Email not verified. A new verification code has been sent to your inbox."
    );
  }

  const token = signToken(user._id);

  return new ApiResponse(200, "Logged in successfully.", {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  }).send(res);
});

// ─── Forgot Password ─────────────────────────────────────────────────────────

// POST /api/v1/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body || {};

  if (!email) throw ApiError.badRequest("Email is required.");

  const user = await User.findOne({ email: email.toLowerCase() });

  // Always return 200 so we don't leak which emails are registered.
  if (user && user.isVerified) {
    const otp = generateOTP();
    await OTP.deleteMany({ email: email.toLowerCase(), type: "FORGOT_PASSWORD" });
    await OTP.create({
      email: email.toLowerCase(),
      otp,
      type: "FORGOT_PASSWORD",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await sendOTPEmail(email, otp, "reset");
  }

  return new ApiResponse(200, "If that email is registered, a reset code has been sent.").send(res);
});

// ─── Reset Password ──────────────────────────────────────────────────────────

// POST /api/v1/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body || {};

  if (!email || !otp || !password) {
    throw ApiError.badRequest("Email, OTP, and new password are required.");
  }
  if (password.length < 8) {
    throw ApiError.badRequest("Password must be at least 8 characters.");
  }

  const record = await OTP.findOne({
    email: email.toLowerCase(),
    otp,
    type: "FORGOT_PASSWORD",
    expiresAt: { $gt: new Date() },
  });

  if (!record) {
    throw ApiError.badRequest("Invalid or expired reset code.");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw ApiError.notFound("User not found.");

  user.password = password; // pre-save hook will hash it
  await user.save();

  await OTP.deleteMany({ email: email.toLowerCase(), type: "FORGOT_PASSWORD" });

  return new ApiResponse(200, "Password reset successfully. Please sign in.").send(res);
});

// ─── Get Me ──────────────────────────────────────────────────────────────────

// GET /api/v1/auth/me  (requires auth)
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, "User fetched.", {
    id: user._id,
    name: user.name,
    email: user.email,
  }).send(res);
});

// ─── Resend OTP ──────────────────────────────────────────────────────────────

// POST /api/v1/auth/resend-otp
export const resendOTP = asyncHandler(async (req, res) => {
  const { email, type = "EMAIL_VERIFICATION" } = req.body || {};

  if (!email) throw ApiError.badRequest("Email is required.");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw ApiError.notFound("User not found.");

  if (type === "EMAIL_VERIFICATION" && user.isVerified) {
    throw ApiError.badRequest("Email is already verified.");
  }

  const otp = generateOTP();
  await OTP.deleteMany({ email: email.toLowerCase(), type });
  await OTP.create({
    email: email.toLowerCase(),
    otp,
    type,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendOTPEmail(email, otp, type === "FORGOT_PASSWORD" ? "reset" : "verify");

  return new ApiResponse(200, "OTP resent.").send(res);
});
