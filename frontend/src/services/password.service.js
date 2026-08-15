import api from "./api";

/**
 * Password Service — CRUD operations for vault password entries.
 * All passwords should be encrypted client-side before being passed here.
 */

/** Get all password entries for the authenticated user */
export const getPasswords = async (params = {}) => {
  const { data } = await api.get("/passwords", { params });
  return data;
};

/** Get a single password entry by ID */
export const getPasswordById = async (id) => {
  const { data } = await api.get(`/passwords/${id}`);
  return data;
};

/** Create a new password entry */
export const createPassword = async (passwordData) => {
  const { data } = await api.post("/passwords", passwordData);
  return data;
};

/** Update an existing password entry */
export const updatePassword = async (id, passwordData) => {
  const { data } = await api.put(`/passwords/${id}`, passwordData);
  return data;
};

/** Delete a password entry */
export const deletePassword = async (id) => {
  const { data } = await api.delete(`/passwords/${id}`);
  return data;
};

/** Search passwords by query string */
export const searchPasswords = async (query) => {
  const { data } = await api.get("/passwords/search", { params: { q: query } });
  return data;
};

/** Get recent password entries */
export const getRecentPasswords = async (limit = 5) => {
  const { data } = await api.get("/passwords/recent", { params: { limit } });
  return data;
};

/** Move a password to a different folder */
export const movePasswordToFolder = async (passwordId, folderId) => {
  const { data } = await api.patch(`/passwords/${passwordId}/folder`, { folderId });
  return data;
};

/** Get password health stats (weak, reused, compromised counts) */
export const getPasswordHealth = async () => {
  const { data } = await api.get("/passwords/health");
  return data;
};
