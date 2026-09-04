import api from "./api";

/**
 * User Service — profile and preferences management.
 */

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

/** Export vault data as an encrypted JSON backup. */
export const exportVault = async () => {
  const response = await api.get("/vault/export-encrypted", { responseType: "blob" });
  const blob = response.data instanceof Blob
    ? response.data
    : new Blob([response.data], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lockely-encrypted-vault-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
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
