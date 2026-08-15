import api from "./api";

/**
 * Folder Service — CRUD operations for vault folders/categories.
 */

/** Get all folders for the authenticated user */
export const getFolders = async () => {
  const { data } = await api.get("/folders");
  return data;
};

/** Get a single folder by ID */
export const getFolderById = async (id) => {
  const { data } = await api.get(`/folders/${id}`);
  return data;
};

/** Create a new folder */
export const createFolder = async (folderData) => {
  // folderData: { name, icon?, color? }
  const { data } = await api.post("/folders", folderData);
  return data;
};

/** Update a folder */
export const updateFolder = async (id, folderData) => {
  const { data } = await api.put(`/folders/${id}`, folderData);
  return data;
};

/** Delete a folder */
export const deleteFolder = async (id) => {
  const { data } = await api.delete(`/folders/${id}`);
  return data;
};

/** Get all passwords inside a specific folder */
export const getFolderPasswords = async (folderId) => {
  const { data } = await api.get(`/folders/${folderId}/passwords`);
  return data;
};
