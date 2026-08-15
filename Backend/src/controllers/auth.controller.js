// Auth controller — Clerk owns sign-up/sign-in/OTP/password-reset
// entirely on the frontend. This controller only mirrors a small local
// profile (name/email) keyed by Clerk's user id, so the rest of the
// backend has a local User document to reference/extend if needed.
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

// POST /api/v1/auth/sync — called by the frontend right after a Clerk
// sign-in/sign-up, so we have a local record of who this user is.
export const sync = asyncHandler(async (req, res) => {
  const { name = "", email = "" } = req.body || {};

  const user = await User.findOneAndUpdate(
    { clerkId: req.user.id },
    {
      clerkId: req.user.id,
      ...(name ? { name } : {}),
      ...(email ? { email: email.toLowerCase() } : {}),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return new ApiResponse(200, "User synced.", user).send(res);
});

// GET /api/v1/auth/session — returns the current Clerk identity plus
// whatever local profile data we have cached for them.
export const session = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.user.id });

  return new ApiResponse(200, "Session fetched.", {
    id: req.user.id,
    sessionId: req.user.sessionId,
    profile: user || null,
  }).send(res);
});
