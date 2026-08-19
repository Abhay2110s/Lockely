// User controller — profile info, security preferences, dashboard
// stats, and account deletion for the authenticated user.
import User from "../models/User.js";
import Password from "../models/password.js";
import OTP from "../models/otp.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import * as vaultService from "../services/vault.service.js";
import * as folderService from "../services/folder.service.js";

// GET /api/v1/users/me
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, "Profile fetched successfully.", {
    id: user._id,
    name: user.name,
    email: user.email,
    displayName: user.displayName,
    bio: user.bio,
    preferredLanguage: user.preferredLanguage,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  }).send(res);
});

// PUT /api/v1/users/me
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  Object.assign(user, req.body);
  await user.save();

  return new ApiResponse(200, "Profile updated successfully.", {
    id: user._id,
    name: user.name,
    email: user.email,
    displayName: user.displayName,
    bio: user.bio,
    preferredLanguage: user.preferredLanguage,
  }).send(res);
});

// GET /api/v1/users/me/security-preferences
export const getSecurityPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  return new ApiResponse(200, "Security preferences fetched successfully.", user.securityPreferences).send(res);
});

// PUT /api/v1/users/me/security-preferences
export const updateSecurityPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  user.securityPreferences = { ...user.securityPreferences.toObject(), ...req.body };
  await user.save();

  return new ApiResponse(200, "Security preferences updated successfully.", user.securityPreferences).send(res);
});

// GET /api/v1/users/me/stats — alias onto the same dashboard stats the vault uses.
export const getStats = asyncHandler(async (req, res) => {
  const stats = await vaultService.getDashboardStats(req.user.id);
  return new ApiResponse(200, "Stats fetched successfully.", stats).send(res);
});

// DELETE /api/v1/users/me — permanently deletes the account and all
// owned data (vault entries, folders, and pending OTPs).
export const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) throw ApiError.notFound("User not found.");

  await Password.deleteMany({ user: req.user.id });
  await folderService.deleteAllForUser(req.user.id);
  await OTP.deleteMany({ email: user.email });
  await user.deleteOne();

  return new ApiResponse(200, "Account deleted successfully.").send(res);
});
