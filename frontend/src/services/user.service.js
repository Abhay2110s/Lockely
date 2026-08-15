import api from "./api";

/**
 * User Service — profile and preferences management.
 */

/** Get the current user's profile from the backend */
export const getUserProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

/** Update user profile data */
export const updateUserProfile = async (profileData) => {
  // profileData: { displayName?, bio?, preferredLanguage? }
  const { data } = await api.put("/users/me", profileData);
  return data;
};

/** Update user security preferences */
export const updateSecurityPreferences = async (prefs) => {
  // prefs: { autoLockMinutes, clipboardClearSeconds, enable2FA }
  const { data } = await api.put("/users/me/security-preferences", prefs);
  return data;
};

/** Get security preferences for the current user */
export const getSecurityPreferences = async () => {
  const { data } = await api.get("/users/me/security-preferences");
  return data;
};

/** Export vault data as encrypted JSON */
export const exportVault = async () => {
  const response = await api.get("/users/me/export", { responseType: "blob" });
  const url = URL.createObjectURL(response.data);
  const a = document.createElement("a");
  a.href = url;
  a.download = `passguardian-vault-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

/** Delete the user's account */
export const deleteAccount = async () => {
  const { data } = await api.delete("/users/me");
  return data;
};

/** Get dashboard stats summary for the user */
export const getDashboardStats = async () => {
  const { data } = await api.get("/users/me/stats");
  return data;
};
