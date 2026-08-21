// Vault service — business logic for encrypted password entries,
// including creation, retrieval, update, soft/hard delete,
// export/import, reuse detection, and dashboard statistics.
//
// Zero-knowledge architecture: vault secrets are encrypted in the browser
// (AES-256-GCM, key derived via PBKDF2 from master password).
// The server only stores and passes through ciphertext/iv/authTag blobs.
// It never decrypts or sees plaintext passwords.
import Password from "../models/password.js";
import ApiError from "../utils/ApiError.js";
import { hashForComparison, validateCiphertextBlob } from "./encryption.service.js";
import { toCSV, fromCSV } from "../utils/csv.js";
import { WEAK_STRENGTH_LEVELS, STRONG_STRENGTH_LEVELS } from "../constants/index.js";

// Escapes regex metacharacters in user-supplied search text so it's safe
// to embed in `new RegExp(...)` — otherwise input like "(" throws a
// SyntaxError (500), and unescaped patterns are a ReDoS risk.
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Columns used for CSV export (excluding url which is handled separately).
const EXPORT_COLUMNS = [
  "title",
  "website",
  "url",
  "username",
  "email",
  "password",
  "category",
  "notes",
  "favorite",
];

/**
 * Validates and extracts the client-provided ciphertext blob + reuse hash.
 * The server never encrypts or decrypts — it just stores what the client sends.
 *
 * @param {object} payload — from the request body
 * @param {string} payload.cipherText  — base64 AES-256-GCM ciphertext
 * @param {string} payload.iv          — base64 12-byte IV
 * @param {string} payload.authTag     — base64 16-byte GCM auth tag
 * @param {string} payload.passwordHash — SHA-256 of plaintext (computed client-side)
 * @param {object} [payload.strength]  — { score, label, entropy } from client
 */
const buildSecretFields = (payload) => {
  validateCiphertextBlob(payload);

  if (!payload.passwordHash) {
    throw ApiError.badRequest("passwordHash is required for reuse detection.");
  }

  return {
    cipherText: payload.cipherText,
    iv: payload.iv,
    authTag: payload.authTag,
    passwordHash: payload.passwordHash,
    strength: {
      score: payload.strength?.score ?? 0,
      label: payload.strength?.label ?? "Unknown",
      entropy: payload.strength?.entropy ?? 0,
    },
    lastPasswordChangeAt: new Date(),
  };
};

/**
 * Validates and extracts backup codes ciphertext blob from the client.
 */
const buildBackupCodesFields = (backupCodes) => {
  if (!backupCodes || !backupCodes.cipherText) {
    return { backupCodes: { cipherText: null, iv: null, authTag: null } };
  }
  validateCiphertextBlob(backupCodes);
  return { backupCodes };
};

/**
 * Shapes a Mongoose vault document for API responses.
 * The ciphertext blob is always returned as-is — the client decrypts it.
 * The server never calls decrypt().
 */
export const toSafeEntry = (doc, _opts = {}) => {
  const obj = doc.toObject({ virtuals: true });

  return {
    id: obj._id,
    title: obj.title,
    website: obj.website,
    url: obj.url,
    icon: obj.icon,
    username: obj.username,
    email: obj.email,
    notes: obj.notes,
    recoveryEmail: obj.recoveryEmail,
    // Return the encrypted blob — the browser decrypts it.
    cipherText: obj.cipherText,
    iv: obj.iv,
    authTag: obj.authTag,
    hasBackupCodes: Boolean(obj.backupCodes?.cipherText),
    // Return backup codes blob too if present.
    backupCodes: obj.backupCodes?.cipherText ? obj.backupCodes : null,
    category: obj.category,
    favorite: obj.favorite,
    strength: obj.strength,
    lastPasswordChangeAt: obj.lastPasswordChangeAt,
    expiryDays: obj.expiryDays,
    expiresAt: obj.expiresAt,
    isExpired: obj.isExpired,
    daysRemaining: obj.daysRemaining,
    historyCount: obj.history?.length || 0,
    isDeleted: obj.isDeleted,
    deletedAt: obj.deletedAt,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const createEntry = async (userId, payload) => {
  const secretFields = buildSecretFields(payload);
  const backupFields = buildBackupCodesFields(payload.backupCodes);

  const entry = await Password.create({
    user: userId,
    title: payload.title,
    website: payload.website,
    url: payload.url,
    icon: payload.icon,
    username: payload.username,
    email: payload.email,
    notes: payload.notes,
    recoveryEmail: payload.recoveryEmail,
    category: payload.category || "General",
    favorite: Boolean(payload.favorite),
    expiryDays: payload.expiryDays,
    ...secretFields,
    ...backupFields,
  });

  return toSafeEntry(entry);
};

// Build a Mongoose filter object from user-supplied search/filter options.
const buildFilterQuery = (userId, { search, category, favorite, weak, expired, includeDeleted }) => {
  const query = { user: userId };

  if (!includeDeleted) {
    query.isDeleted = false;
  }

  if (category) {
    query.category = new RegExp(`^${escapeRegExp(category)}$`, "i");
  }

  if (favorite === "true" || favorite === true) {
    query.favorite = true;
  }

  if (weak === "true" || weak === true) {
    query["strength.label"] = { $in: WEAK_STRENGTH_LEVELS };
  }

  if (search) {
    const regex = new RegExp(escapeRegExp(search.trim()), "i");
    query.$or = [{ website: regex }, { username: regex }, { title: regex }, { category: regex }];
  }

  return query;
};

// Apply sorting to a Mongoose query based on the sortBy option.
const applySort = (query, sortBy) => {
  switch (sortBy) {
    case "oldest":
      return query.sort({ createdAt: 1 });
    case "alphabetical":
      return query.sort({ title: 1 });
    case "strength":
      return query.sort({ "strength.score": -1 });
    case "latest":
    default:
      return query.sort({ createdAt: -1 });
  }
};

// Retrieve paginated, filtered, and sorted vault entries for a user.
export const getEntries = async (userId, options = {}) => {
  const { page = 1, limit = 20, expired } = options;

  const filter = buildFilterQuery(userId, options);
  let query = Password.find(filter);
  query = applySort(query, options.sortBy);

  // Expiry can't be filtered at the DB level (it's a virtual derived from
  // lastPasswordChangeAt + expiryDays), so fetch then filter in memory.
  let entries = await query.exec();

  if (expired === "true" || expired === true) {
    entries = entries.filter((entry) => entry.isExpired);
  }

  const total = entries.length;
  const pageNum = Math.max(Number(page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(limit) || 20, 1), 100);
  const start = (pageNum - 1) * pageSize;
  const paginated = entries.slice(start, start + pageSize);

  return {
    total,
    page: pageNum,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
    entries: paginated.map((e) => toSafeEntry(e)),
  };
};

// Find a vault entry owned by the user, throwing if not found.
const findOwnedEntry = async (userId, id, { includeDeleted = false } = {}) => {
  const query = { _id: id, user: userId };
  if (!includeDeleted) query.isDeleted = false;

  const entry = await Password.findOne(query);
  if (!entry) {
    throw ApiError.notFound("Password entry not found.");
  }
  return entry;
};

export const getEntryById = async (userId, id, { reveal = false } = {}) => {
  const entry = await findOwnedEntry(userId, id);
  return toSafeEntry(entry, { reveal });
};

export const updateEntry = async (userId, id, payload) => {
  const entry = await findOwnedEntry(userId, id);

  const fields = [
    "title",
    "website",
    "url",
    "icon",
    "username",
    "email",
    "notes",
    "recoveryEmail",
    "category",
    "favorite",
    "expiryDays",
  ];

  fields.forEach((field) => {
    if (payload[field] !== undefined) {
      entry[field] = payload[field];
    }
  });

  if (payload.backupCodes !== undefined) {
    const { backupCodes } = buildBackupCodesFields(payload.backupCodes);
    entry.backupCodes = backupCodes;
  }

  if (payload.cipherText !== undefined) {
    // Client is updating the password (re-encrypted and sent as a new blob).
    const newHash = payload.passwordHash;
    if (!newHash) throw ApiError.badRequest("passwordHash is required when updating the password.");

    const reusedInHistory =
      entry.passwordHash === newHash ||
      entry.history.some((h) => h.passwordHash === newHash);

    if (reusedInHistory) {
      throw ApiError.badRequest(
        "This password was used before. Please choose a new, unique password."
      );
    }

    // Push the current secret into history before overwriting it.
    entry.history.unshift({
      cipherText: entry.cipherText,
      iv: entry.iv,
      authTag: entry.authTag,
      passwordHash: entry.passwordHash,
      changedAt: entry.lastPasswordChangeAt,
    });
    // Cap history length to avoid unbounded growth.
    entry.history = entry.history.slice(0, 10);

    const secretFields = buildSecretFields(payload);
    Object.assign(entry, secretFields);
  }

  await entry.save();
  return toSafeEntry(entry);
};

export const softDeleteEntry = async (userId, id) => {
  const entry = await findOwnedEntry(userId, id);
  entry.isDeleted = true;
  entry.deletedAt = new Date();
  await entry.save();
  return toSafeEntry(entry);
};

export const restoreEntry = async (userId, id) => {
  const entry = await findOwnedEntry(userId, id, { includeDeleted: true });
  entry.isDeleted = false;
  entry.deletedAt = null;
  await entry.save();
  return toSafeEntry(entry);
};

export const deleteEntryPermanently = async (userId, id) => {
  const entry = await findOwnedEntry(userId, id, { includeDeleted: true });
  await entry.deleteOne();
  return { id };
};

export const toggleFavorite = async (userId, id, favorite) => {
  const entry = await findOwnedEntry(userId, id);
  entry.favorite = typeof favorite === "boolean" ? favorite : !entry.favorite;
  await entry.save();
  return toSafeEntry(entry);
};

export const getFavorites = async (userId) => {
  const entries = await Password.find({ user: userId, isDeleted: false, favorite: true }).sort({
    createdAt: -1,
  });
  return entries.map((e) => toSafeEntry(e));
};

export const getCategories = async (userId) => {
  const categories = await Password.find({ user: userId, isDeleted: false }).distinct(
    "category"
  );
  return categories.sort((a, b) => a.localeCompare(b));
};

/**
 * Groups all active entries by their password hash to find reused
 * passwords without ever decrypting anything.
 */
const computeReuseGroups = (entries) => {
  const groups = new Map();
  entries.forEach((entry) => {
    const key = entry.passwordHash;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(entry);
  });
  return [...groups.values()].filter((group) => group.length > 1);
};

export const getDashboardStats = async (userId) => {
  const entries = await Password.find({ user: userId, isDeleted: false });

  const total = entries.length;
  const weak = entries.filter((e) => WEAK_STRENGTH_LEVELS.includes(e.strength.label)).length;
  const strong = entries.filter((e) => STRONG_STRENGTH_LEVELS.includes(e.strength.label)).length;
  const favorite = entries.filter((e) => e.favorite).length;
  const expired = entries.filter((e) => e.isExpired).length;

  const avgEntropy =
    total === 0
      ? 0
      : Number(
          (entries.reduce((sum, e) => sum + (e.strength.entropy || 0), 0) / total).toFixed(2)
        );

  const avgScore =
    total === 0
      ? 0
      : Number((entries.reduce((sum, e) => sum + (e.strength.score || 0), 0) / total).toFixed(2));

  const reuseGroups = computeReuseGroups(entries);
  const reusedCount = reuseGroups.reduce((sum, group) => sum + group.length, 0);

  return {
    totalPasswords: total,
    weakPasswords: weak,
    strongPasswords: strong,
    favoritePasswords: favorite,
    averageEntropy: avgEntropy,
    reusedPasswords: reusedCount,
    reusedGroups: reuseGroups.length,
    expiredPasswords: expired,
    // Overall security score blends average strength score with
    // penalties for reuse and expiry — a simple, explainable heuristic.
    securityScore: Math.max(
      0,
      Math.round(
        avgScore -
          (total ? (reusedCount / total) * 20 : 0) -
          (total ? (expired / total) * 15 : 0)
      )
    ),
  };
};

export const getReusedPasswords = async (userId) => {
  const entries = await Password.find({ user: userId, isDeleted: false });
  const reuseGroups = computeReuseGroups(entries);

  return reuseGroups.map((group) =>
    group.map((entry) => ({
      id: entry._id,
      title: entry.title,
      website: entry.website,
      username: entry.username,
    }))
  );
};

export const exportEncryptedEntries = async (userId) => {
  const entries = await Password.find({ user: userId, isDeleted: false }).lean();

  return JSON.stringify(
    {
      format: "passguardian-encrypted-vault",
      version: 2,
      exportedAt: new Date().toISOString(),
      encryption: {
        algorithm: "AES-256-GCM",
        keyDerivation: "PBKDF2-SHA256-client-side",
        note: "Secrets are encrypted client-side. Only the account owner with their master password can decrypt."
      },
      entries: entries.map((entry) => ({
        id: String(entry._id),
        title: entry.title,
        website: entry.website || "",
        url: entry.url || "",
        icon: entry.icon || "",
        username: entry.username || "",
        email: entry.email || "",
        cipherText: entry.cipherText,
        iv: entry.iv,
        authTag: entry.authTag,
        passwordHash: entry.passwordHash,
        strength: entry.strength,
        notes: entry.notes || "",
        recoveryEmail: entry.recoveryEmail || "",
        backupCodes: entry.backupCodes || { cipherText: null, iv: null, authTag: null },
        category: entry.category || "General",
        favorite: Boolean(entry.favorite),
        lastPasswordChangeAt: entry.lastPasswordChangeAt,
        expiryDays: entry.expiryDays,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
      })),
    },
    null,
    2
  );
};

export const exportEntries = async (userId, format) => {
  const entries = await Password.find({ user: userId, isDeleted: false });
  const rows = entries.map((entry) => {
    // In the zero-knowledge model the server cannot decrypt secrets.
    // The plaintext CSV export is no longer supported server-side.
    // Clients must use the encrypted export and decrypt locally.
    return {
      title: entry.title || "",
      website: entry.website || "",
      url: entry.url || "",
      username: entry.username || "",
      email: entry.email || "",
      password: "[encrypted — export via the app to decrypt]",
      category: entry.category || "",
      notes: entry.notes || "",
      favorite: entry.favorite,
    };
  });

  if (format === "csv") {
    return toCSV(rows, EXPORT_COLUMNS.filter((c) => c !== "url").concat("url"));
  }

  return JSON.stringify(rows, null, 2);
};

export const importEntries = async (userId, format, data) => {
  const rows = format === "csv" ? fromCSV(data) : JSON.parse(data);

  if (!Array.isArray(rows)) {
    throw ApiError.badRequest("Import data must be an array of entries.");
  }

  const results = { imported: 0, failed: 0, errors: [] };

  for (const [index, row] of rows.entries()) {
    try {
      if (!row.title || !row.password) {
        throw new Error("title and password are required.");
      }

      await createEntry(userId, {
        title: row.title,
        website: row.website || "",
        url: row.url || "",
        username: row.username || "",
        email: row.email || "",
        password: row.password,
        category: row.category || "General",
        notes: row.notes || "",
        favorite: row.favorite === true || row.favorite === "true",
        backupCodes: [],
      });

      results.imported += 1;
    } catch (error) {
      results.failed += 1;
      results.errors.push({ row: index + 1, message: error.message });
    }
  }

  return results;
};
