// Vault controller — CRUD operations for encrypted password entries,
// including export/import, favorites, soft-delete, and dashboard stats.
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as vaultService from "../services/vault.service.js";

// Save a new password entry to the vault for the authenticated user.
export const createPassword = asyncHandler(async (req, res) => {
  const entry = await vaultService.createEntry(req.user.id, req.body);
  return new ApiResponse(201, "Password saved successfully.", entry).send(res);
});

// Retrieve all vault entries for the authenticated user with
// optional search, filter, sort, and pagination via query params.
export const getAllPasswords = asyncHandler(async (req, res) => {
  const result = await vaultService.getEntries(req.user.id, req.query);
  return new ApiResponse(200, "Passwords fetched successfully.", result).send(res);
});

// Fetch a single vault entry by ID. Pass ?reveal=true to decrypt
// and return the plaintext password.
export const getPasswordById = asyncHandler(async (req, res) => {
  const reveal = req.query.reveal === "true";
  const entry = await vaultService.getEntryById(req.user.id, req.params.id, { reveal });
  return new ApiResponse(200, "Password fetched successfully.", entry).send(res);
});

// Update an existing vault entry.
export const updatePassword = asyncHandler(async (req, res) => {
  const entry = await vaultService.updateEntry(req.user.id, req.params.id, req.body);
  return new ApiResponse(200, "Password updated successfully.", entry).send(res);
});

// Permanently delete a vault entry from the database.
export const deletePassword = asyncHandler(async (req, res) => {
  const result = await vaultService.deleteEntryPermanently(req.user.id, req.params.id);
  return new ApiResponse(200, "Password permanently deleted.", result).send(res);
});

// Soft-delete a vault entry (moves it to trash instead of removing it).
export const softDeletePassword = asyncHandler(async (req, res) => {
  const entry = await vaultService.softDeleteEntry(req.user.id, req.params.id);
  return new ApiResponse(200, "Password moved to trash.", entry).send(res);
});

// Restore a soft-deleted vault entry back to the active vault.
export const restorePassword = asyncHandler(async (req, res) => {
  const entry = await vaultService.restoreEntry(req.user.id, req.params.id);
  return new ApiResponse(200, "Password restored successfully.", entry).send(res);
});

// Toggle the favorite status of a vault entry.
export const toggleFavorite = asyncHandler(async (req, res) => {
  const entry = await vaultService.toggleFavorite(
    req.user.id,
    req.params.id,
    req.body?.favorite
  );
  return new ApiResponse(200, "Favorite status updated.", entry).send(res);
});

// Retrieve all favorite entries for the authenticated user.
export const getFavorites = asyncHandler(async (req, res) => {
  const entries = await vaultService.getFavorites(req.user.id);
  return new ApiResponse(200, "Favorite passwords fetched.", entries).send(res);
});

// Retrieve the distinct list of categories used by the authenticated user.
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await vaultService.getCategories(req.user.id);
  return new ApiResponse(200, "Categories fetched.", categories).send(res);
});

// Get dashboard statistics: total, weak/strong counts, reuse, expiry, and a security score.
export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await vaultService.getDashboardStats(req.user.id);
  return new ApiResponse(200, "Dashboard statistics fetched.", stats).send(res);
});

// Retrieve groups of entries that share the same password (reuse detection).
export const getReusedPasswords = asyncHandler(async (req, res) => {
  const groups = await vaultService.getReusedPasswords(req.user.id);
  return new ApiResponse(200, "Reused password groups fetched.", groups).send(res);
});

// Export all vault entries in JSON or CSV format.
export const exportEncryptedPasswords = asyncHandler(async (req, res) => {
  const output = await vaultService.exportEncryptedEntries(req.user.id);
  const filename = `passguardian-encrypted-vault-${Date.now()}.json`;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  return res.status(200).send(output);
});

export const exportPasswords = asyncHandler(async (req, res) => {
  const format = req.query.format === "csv" ? "csv" : "json";
  const output = await vaultService.exportEntries(req.user.id, format);

  const filename = `passguardian-export-${Date.now()}.${format}`;
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader(
    "Content-Type",
    format === "csv" ? "text/csv" : "application/json"
  );
  return res.status(200).send(output);
});

// Import vault entries from a JSON or CSV payload.
export const importPasswords = asyncHandler(async (req, res) => {
  const { format, data } = req.body;
  const result = await vaultService.importEntries(req.user.id, format, data);
  return new ApiResponse(200, "Import completed.", result).send(res);
});
