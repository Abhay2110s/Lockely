// Folder service — business logic for vault folders. A folder's `name`
// is the same string stored in a Password entry's `category` field, so
// "the passwords in a folder" are simply the entries whose category
// matches that folder's name for the same user.
import Folder from "../models/folder.js";
import Password from "../models/password.js";
import ApiError from "../utils/ApiError.js";

/** List all folders for a user, each annotated with its entry count. */
export const getFolders = async (userId) => {
  const folders = await Folder.find({ user: userId }).sort({ createdAt: 1 }).lean();

  const counts = await Password.aggregate([
    { $match: { user: userId, isDeleted: false } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  const countByCategory = Object.fromEntries(counts.map((c) => [c._id, c.count]));

  return folders.map((f) => ({ ...f, passwordCount: countByCategory[f.name] || 0 }));
};

/** Fetch a single folder owned by the user. */
export const getFolderById = async (userId, folderId) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId }).lean();
  if (!folder) throw ApiError.notFound("Folder not found.");
  return folder;
};

/** Create a new folder for the user. */
export const createFolder = async (userId, payload) => {
  const existing = await Folder.findOne({ user: userId, name: payload.name });
  if (existing) throw ApiError.conflict("A folder with this name already exists.");

  return Folder.create({ user: userId, ...payload });
};

/**
 * Update a folder. If the name changes, cascade the rename onto every
 * vault entry whose category matched the old name, so folder membership
 * doesn't silently break.
 */
export const updateFolder = async (userId, folderId, payload) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId });
  if (!folder) throw ApiError.notFound("Folder not found.");

  if (payload.name && payload.name !== folder.name) {
    const clash = await Folder.findOne({ user: userId, name: payload.name, _id: { $ne: folderId } });
    if (clash) throw ApiError.conflict("A folder with this name already exists.");

    await Password.updateMany(
      { user: userId, category: folder.name },
      { $set: { category: payload.name } }
    );
  }

  Object.assign(folder, payload);
  await folder.save();
  return folder;
};

/**
 * Delete a folder. Entries that belonged to it aren't deleted — their
 * category is reset to "General" so they remain visible in the vault.
 */
export const deleteFolder = async (userId, folderId) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId });
  if (!folder) throw ApiError.notFound("Folder not found.");

  await Password.updateMany(
    { user: userId, category: folder.name },
    { $set: { category: "General" } }
  );
  await folder.deleteOne();
};

/** List all (non-deleted) vault entries belonging to a folder. */
export const getFolderPasswords = async (userId, folderId) => {
  const folder = await Folder.findOne({ _id: folderId, user: userId }).lean();
  if (!folder) throw ApiError.notFound("Folder not found.");

  return Password.find({ user: userId, category: folder.name, isDeleted: false })
    .select("-cipherText -iv -authTag -history -backupCodes")
    .sort({ createdAt: -1 })
    .lean();
};

/** Delete every folder belonging to a user — used on account deletion. */
export const deleteAllForUser = async (userId) => {
  await Folder.deleteMany({ user: userId });
};
