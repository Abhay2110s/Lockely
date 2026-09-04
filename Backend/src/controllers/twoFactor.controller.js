// Two-Factor Authentication controller — TOTP-based 2FA using otplib.
// Flow:
//   1. setup()        — generate a TOTP secret and QR code URI
//   2. verifySetup()  — confirm first code, enable 2FA, return backup codes
//   3. verifyCode()   — called during login after email+password to issue cookie
//   4. disable()      — turn off 2FA (requires valid code or backup code)
import crypto from "crypto";
import { generateSecret, generateURI, verify } from "otplib";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import env from "../config/env.js";

const APP_NAME = "Lockely";

// Backup codes: 8 codes of the form XXXX-XXXX (32-bit random hex, hyphenated).
const generateBackupCodes = () =>
  Array.from({ length: 8 }, () => {
    const hex = crypto.randomBytes(4).toString("hex").toUpperCase();
    return `${hex.slice(0, 4)}-${hex.slice(4)}`;
  });

// Hash each backup code with bcrypt for storage.
const hashBackupCodes = async (codes) =>
  Promise.all(codes.map((code) => bcrypt.hash(code, 10)));

// Verify a TOTP token or a backup code. Returns true on match.
const verifyTokenOrBackupCode = async (user, { token, backupCode }) => {
  // Try TOTP first.
  if (token && user.twoFactorSecret) {
    const res = await verify({ token: String(token).trim(), secret: user.twoFactorSecret });
    if (res?.valid) return true;
  }
  // Try backup codes.
  if (backupCode && user.twoFactorBackupCodes?.length > 0) {
    const cleanBackup = String(backupCode).trim().toUpperCase();
    for (let i = 0; i < user.twoFactorBackupCodes.length; i++) {
      const match = await bcrypt.compare(cleanBackup, user.twoFactorBackupCodes[i]);
      if (match) {
        // Consume (remove) the used backup code.
        user.twoFactorBackupCodes.splice(i, 1);
        await user.save();
        return true;
      }
    }
  }
  return false;
};

// ─── Setup ───────────────────────────────────────────────────────────────────

// POST /api/v1/auth/2fa/setup
// Generates a TOTP secret and returns the otpauth:// URI for QR code display.
// Does NOT enable 2FA yet — the user must confirm with verifySetup first.
export const setup = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  if (user.twoFactorEnabled) {
    throw ApiError.badRequest("2FA is already enabled. Disable it first to re-enroll.");
  }

  const secret = generateSecret();
  const otpAuthUrl = generateURI({ issuer: APP_NAME, label: user.email, secret });

  // Temporarily store the secret until verifySetup confirms the first code.
  user.twoFactorSecret = secret;
  await user.save();

  return new ApiResponse(200, "2FA setup initiated. Scan the QR code in your authenticator app.", {
    otpAuthUrl,
    // Raw secret is also returned for users who prefer manual entry.
    secret,
  }).send(res);
});

// ─── Verify Setup ─────────────────────────────────────────────────────────────

// POST /api/v1/auth/2fa/verify-setup
// Confirms the first TOTP code, enables 2FA, and returns one-time backup codes.
export const verifySetup = asyncHandler(async (req, res) => {
  const { token } = req.body || {};
  if (!token) throw ApiError.badRequest("TOTP token is required.");

  const user = await User.findById(req.user.id).select("+twoFactorSecret +twoFactorBackupCodes");
  if (!user) throw ApiError.notFound("User not found.");

  if (!user.twoFactorSecret) {
    throw ApiError.badRequest("2FA setup not started. Call /2fa/setup first.");
  }

  const resVerify = await verify({ token: String(token).trim(), secret: user.twoFactorSecret });
  if (!resVerify?.valid) {
    throw ApiError.badRequest("Invalid TOTP code. Please try again.");
  }

  const plainBackupCodes = generateBackupCodes();
  const hashedCodes = await hashBackupCodes(plainBackupCodes);

  user.twoFactorEnabled = true;
  user.twoFactorBackupCodes = hashedCodes;
  await user.save();

  return new ApiResponse(200, "2FA enabled successfully.", {
    // Return plaintext codes ONCE — they are never stored unencrypted.
    backupCodes: plainBackupCodes,
  }).send(res);
});

// ─── Verify Code (login step) ─────────────────────────────────────────────────

// POST /api/v1/auth/2fa/verify
// Called after successful email+password login when 2FA is required.
// The client passes the pendingUserId returned by login, plus the TOTP code.
// On success, issues the auth cookie (completing the login).
export const verifyCode = asyncHandler(async (req, res) => {
  const { pendingUserId, token, backupCode } = req.body || {};

  if (!pendingUserId) {
    throw ApiError.badRequest("pendingUserId is required.");
  }
  if (!token && !backupCode) {
    throw ApiError.badRequest("A TOTP token or backup code is required.");
  }

  const user = await User.findById(pendingUserId).select("+twoFactorSecret +twoFactorBackupCodes");
  if (!user || !user.twoFactorEnabled) {
    throw ApiError.unauthorized("Invalid 2FA session.");
  }

  const valid = await verifyTokenOrBackupCode(user, { token, backupCode });
  if (!valid) {
    throw ApiError.unauthorized("Invalid TOTP code or backup code.");
  }

  // 2FA passed — issue the auth cookie now.
  const jwt = (await import("jsonwebtoken")).default;
  const authToken = jwt.sign({ userId: user._id.toString() }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });

  const isProduction = env.NODE_ENV === "production";
  res.cookie("pg_auth", authToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return new ApiResponse(200, "2FA verified. Logged in successfully.", {
    token: authToken,
    user: { id: user._id, name: user.name, email: user.email },
    vaultKeySalt: user.vaultKeySalt,
  }).send(res);
});

// ─── Disable ──────────────────────────────────────────────────────────────────

// POST /api/v1/auth/2fa/disable
// Turns off 2FA. Requires a valid TOTP code or backup code to confirm.
export const disable = asyncHandler(async (req, res) => {
  const { token, backupCode } = req.body || {};

  if (!token && !backupCode) {
    throw ApiError.badRequest("A TOTP token or backup code is required to disable 2FA.");
  }

  const user = await User.findById(req.user.id).select("+twoFactorSecret +twoFactorBackupCodes");
  if (!user) throw ApiError.notFound("User not found.");

  if (!user.twoFactorEnabled) {
    throw ApiError.badRequest("2FA is not enabled on this account.");
  }

  const valid = await verifyTokenOrBackupCode(user, { token, backupCode });
  if (!valid) {
    throw ApiError.unauthorized("Invalid TOTP code or backup code.");
  }

  user.twoFactorEnabled = false;
  user.twoFactorSecret = null;
  user.twoFactorBackupCodes = [];
  await user.save();

  return new ApiResponse(200, "2FA disabled successfully.").send(res);
});
