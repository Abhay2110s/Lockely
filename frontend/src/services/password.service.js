import api from "./api";

/**
 * Vault Service — CRUD + analytics for encrypted password vault entries.
 * Maps 1:1 onto the backend's /api/v1/vault routes.
 */

/**
 * List vault entries with search/filter/sort/pagination.
 * @param {{search?: string, category?: string, favorite?: boolean, weak?: boolean, expired?: boolean, sortBy?: "latest"|"oldest"|"alphabetical"|"strength", page?: number, limit?: number}} params
 */
export const getPasswords = async (params = {}) => {
  const { data } = await api.get("/vault", { params });
  return data;
};

/** Create a new vault entry. */
export const createPassword = async (passwordData) => {
  const { data } = await api.post("/vault", passwordData);
  return data;
};

/** Move a vault entry to trash (recoverable via restorePassword). */
export const softDeletePassword = async (id) => {
  const { data } = await api.patch(`/vault/${id}/soft-delete`);
  return data;
};

/** Security dashboard stats: totals, weak/strong/reused counts, score, etc. */
export const getDashboardStats = async () => {
  const { data } = await api.get("/vault/dashboard");
  return data;
};
