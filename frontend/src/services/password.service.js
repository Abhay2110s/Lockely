import api from "./api";

/**
 * Vault Service — CRUD + analytics for encrypted password vault entries.
 * Maps 1:1 onto the backend's /api/v1/vault routes. Passwords are
 * encrypted server-side; entries are returned redacted unless you pass
 * `reveal: true` to getPasswordById.
 */

/**
 * List vault entries with search/filter/sort/pagination.
 * @param {{search?: string, category?: string, favorite?: boolean, weak?: boolean, expired?: boolean, sortBy?: "latest"|"oldest"|"alphabetical"|"strength", page?: number, limit?: number}} params
 */
export const getPasswords = async (params = {}) => {
  const { data } = await api.get("/vault", { params });
  return data;
};

/** Get a single vault entry by id. Pass reveal: true to decrypt the password. */
export const getPasswordById = async (id, reveal = false) => {
  const { data } = await api.get(`/vault/${id}`, { params: { reveal } });
  return data;
};

/** Create a new vault entry. */
export const createPassword = async (passwordData) => {
  const { data } = await api.post("/vault", passwordData);
  return data;
};

/** Update an existing vault entry (any subset of its fields). */
export const updatePassword = async (id, passwordData) => {
  const { data } = await api.put(`/vault/${id}`, passwordData);
  return data;
};

/** Permanently delete a vault entry. */
export const deletePassword = async (id) => {
  const { data } = await api.delete(`/vault/${id}`);
  return data;
};

/** Move a vault entry to trash (recoverable via restorePassword). */
export const softDeletePassword = async (id) => {
  const { data } = await api.patch(`/vault/${id}/soft-delete`);
  return data;
};

/** Restore a soft-deleted vault entry from trash. */
export const restorePassword = async (id) => {
  const { data } = await api.patch(`/vault/${id}/restore`);
  return data;
};

/** Toggle (or explicitly set) an entry's favorite flag. */
export const toggleFavorite = async (id, favorite) => {
  const { data } = await api.patch(`/vault/${id}/favorite`, favorite === undefined ? {} : { favorite });
  return data;
};

/** Security dashboard stats: totals, weak/strong/reused counts, score, etc. */
export const getDashboardStats = async () => {
  const { data } = await api.get("/vault/dashboard");
  return data;
};

/** Groups of entries that reuse the same password. */
export const getReusedPasswords = async () => {
  const { data } = await api.get("/vault/reused");
  return data;
};

/** All favorited entries. */
export const getFavorites = async () => {
  const { data } = await api.get("/vault/favorites");
  return data;
};

/** Distinct categories currently in use across the vault. */
export const getCategories = async () => {
  const { data } = await api.get("/vault/categories");
  return data;
};

/** Export the vault as JSON or CSV. */
export const exportVault = async (format = "json") => {
  const { data } = await api.get("/vault/export", { params: { format } });
  return data;
};

/** Bulk-import entries from a JSON array or CSV string. */
export const importVault = async (format, payload) => {
  const { data } = await api.post("/vault/import", { format, data: payload });
  return data;
};
