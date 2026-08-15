import api from "./api";

/**
 * Auth Service — handles auth-related API calls to the backend.
 * Note: Sign-in / sign-up is handled by Clerk on the frontend.
 * These calls are for backend-side user sync after Clerk auth.
 */

/**
 * Sync the authenticated Clerk user with the backend database.
 * Call this after successful Clerk sign-in.
 */
export const syncUser = async (userData) => {
  const { data } = await api.post("/auth/sync", userData);
  return data;
};

/**
 * Get current session info from the backend.
 */
export const getSession = async () => {
  const { data } = await api.get("/auth/session");
  return data;
};

/**
 * Revoke all sessions / force logout on backend side.
 */
export const revokeAllSessions = async () => {
  const { data } = await api.post("/auth/revoke-sessions");
  return data;
};

/**
 * Check if a password has been compromised via k-anonymity API.
 * @param {string} password - The raw password to check
 * @returns {{ compromised: boolean, count: number }}
 */
export const checkPasswordBreach = async (password) => {
  // SHA-1 hash the password, send first 5 chars to HIBP k-anonymity endpoint
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();

  const prefix = hashHex.slice(0, 5);
  const suffix = hashHex.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await response.text();

  const matches = text.split("\n").find((line) => line.startsWith(suffix));
  if (matches) {
    const count = parseInt(matches.split(":")[1], 10);
    return { compromised: true, count };
  }
  return { compromised: false, count: 0 };
};
