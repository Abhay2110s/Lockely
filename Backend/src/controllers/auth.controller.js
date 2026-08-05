// Authentication controller — handles user registration, login, OTP
// verification, password reset, and profile retrieval.
import bcrypt from "bcrypt";
import crypto from "crypto";

import User from "../models/User.js";
import OTP from "../models/OTP.js";

import generateOTP from "../utils/generateOTP.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { OTP_TYPES } from "../constants/index.js";
import env from "../config/env.js";

// Helper: OTP time-to-live in milliseconds, derived from env config.
const OTP_TTL_MS = () => env.OTP_EXPIRE_MINUTES * 60 * 1000;

// Upsert an OTP record for a given email + type, returning the generated OTP value.
const upsertOtp = async (email, type) => {
  const otp = generateOTP();
  await OTP.findOneAndUpdate(
    { email, type },
    { email, otp, type, expiresAt: new Date(Date.now() + OTP_TTL_MS()) },
    { upsert: true, new: true }
  );
  return otp;
};

// Cookie options used when setting the JWT after successful login.
const cookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// Register a new user: hash the password, create the user, then send
// an email-verification OTP.
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw ApiError.badRequest("All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict("User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
  });

  const otp = await upsertOtp(email, OTP_TYPES.EMAIL_VERIFICATION);

  await sendEmail(
    email,
    "Email Verification OTP",
    `Your OTP is ${otp}. It expires in ${env.OTP_EXPIRE_MINUTES} minutes.`
  );

  return new ApiResponse(201, "Registration successful. Verify your email.").send(res);
});

// Resend a verification OTP to a user who has not yet verified their email.
export const resendVerificationOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("User not found.");
  }
  if (user.isVerified) {
    throw ApiError.badRequest("Email is already verified.");
  }

  const otp = await upsertOtp(email, OTP_TYPES.EMAIL_VERIFICATION);

  await sendEmail(
    email,
    "Email Verification OTP",
    `Your new OTP is ${otp}. It expires in ${env.OTP_EXPIRE_MINUTES} minutes.`
  );

  return new ApiResponse(200, "Verification OTP resent.").send(res);
});

// Verify the email-verification OTP and mark the user as verified.
export const verifyEmailOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpData = await OTP.findOne({ email, otp, type: OTP_TYPES.EMAIL_VERIFICATION });

  if (!otpData) {
    throw ApiError.badRequest("Invalid OTP.");
  }
  if (otpData.expiresAt < new Date()) {
    throw ApiError.badRequest("OTP expired.");
  }

  await User.findOneAndUpdate({ email }, { isVerified: true });
  await OTP.deleteOne({ _id: otpData._id });

  return new ApiResponse(200, "Email verified successfully.").send(res);
});

// Initiate login: verify credentials, then send a login OTP to the user's email.
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("User not found.");
  }
  if (!user.isVerified) {
    throw ApiError.unauthorized("Please verify your email first.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid password.");
  }

  const otp = await upsertOtp(email, OTP_TYPES.LOGIN);

  await sendEmail(email, "Login OTP", `Your login OTP is ${otp}`);

  return new ApiResponse(200, "Login OTP sent to email.").send(res);
});

// Verify the login OTP and issue a JWT — set as an httpOnly cookie and
// returned in the response body for clients that cannot use cookies.
export const verifyLoginOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const otpData = await OTP.findOne({ email, otp, type: OTP_TYPES.LOGIN });

  if (!otpData) {
    throw ApiError.badRequest("Invalid OTP.");
  }
  if (otpData.expiresAt < new Date()) {
    throw ApiError.badRequest("OTP expired.");
  }

  const user = await User.findOne({ email });
  const token = generateToken(user._id);

  // Set an httpOnly cookie for browser clients, AND return the token in
  // the body so clients that can't rely on cross-site cookies (e.g. a
  // frontend on a different domain) can store it as a Bearer token.
  res.cookie("token", token, cookieOptions());

  await OTP.deleteOne({ _id: otpData._id });

  return new ApiResponse(200, "Login successful.", {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  }).send(res);
});

// Initiate a password reset: generate a secure random token, hash it,
// store it on the user record, and email a reset link.
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Respond identically whether or not the user exists, to avoid leaking
  // which emails are registered.
  if (user) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpires = new Date(
      Date.now() + env.RESET_TOKEN_EXPIRE_MINUTES * 60 * 1000
    );
    await user.save();

    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(
      email
    )}`;

    await sendEmail(
      email,
      "Password Reset Request",
      `Reset your password using this link (valid for ${env.RESET_TOKEN_EXPIRE_MINUTES} minutes): ${resetUrl}`
    );
  }

  return new ApiResponse(
    200,
    "If an account with that email exists, a reset link has been sent."
  ).send(res);
});

// Complete a password reset using the token from the emailed link.
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, newPassword } = req.body;

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  }).select("+resetPasswordTokenHash +resetPasswordExpires");

  if (!user) {
    throw ApiError.badRequest("Reset link is invalid or has expired.");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordTokenHash = null;
  user.resetPasswordExpires = null;
  await user.save();

  return new ApiResponse(200, "Password reset successfully. You can now log in.").send(res);
});

// Logout: clear the JWT cookie on the client side.
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions());
  return new ApiResponse(200, "Logged out successfully.").send(res);
});

// Fetch the authenticated user's profile (excluding the password hash).
export const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    throw ApiError.notFound("User not found.");
  }
  return new ApiResponse(200, "Profile fetched successfully.", user).send(res);
});
