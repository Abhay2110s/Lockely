import api from "./api";

/**
 * Auth Service — manual JWT auth calls to the backend.
 * The JWT is managed server-side via httpOnly cookie; no token handling
 * is done in this service — just call the endpoints and let cookies flow.
 */

/** Create a new account. Backend sends a verification OTP to the email. */
export const register = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

/** Verify the email OTP. Backend sets auth cookie; returns { user } on success. */
export const verifyOTP = async ({ email, otp }) => {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  return data;
};

/** Login with email + password. Backend sets auth cookie; returns { user } on success. */
export const login = async ({ email, password }) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

/** Request a password-reset OTP sent to the given email. */
export const forgotPassword = async ({ email }) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

/** Reset the password using the OTP code. */
export const resetPassword = async ({ email, otp, password }) => {
  const { data } = await api.post("/auth/reset-password", { email, otp, password });
  return data;
};

/** Resend an OTP (type: "EMAIL_VERIFICATION" | "FORGOT_PASSWORD"). */
export const resendOTP = async ({ email, type }) => {
  const { data } = await api.post("/auth/resend-otp", { email, type });
  return data;
};

/** Clear the auth cookie server-side, ending the session. */
export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

// ─── 2FA ─────────────────────────────────────────────────────────────────────

/** Start 2FA enrollment — returns { otpAuthUrl, secret } for QR code display. */
export const setup2FA = async () => {
  const { data } = await api.post("/auth/2fa/setup");
  return data;
};

/** Confirm the first TOTP code to activate 2FA — returns { backupCodes }. */
export const verifySetup2FA = async ({ token }) => {
  const { data } = await api.post("/auth/2fa/verify-setup", { token });
  return data;
};

/**
 * Verify a TOTP code during the 2FA login step.
 * Called after successful email+password with a pendingUserId from the server.
 */
export const verify2FA = async ({ pendingUserId, token, backupCode }) => {
  const { data } = await api.post("/auth/2fa/verify", { pendingUserId, token, backupCode });
  return data;
};

/** Disable 2FA — requires a valid TOTP code or backup code for confirmation. */
export const disable2FA = async ({ token, backupCode }) => {
  const { data } = await api.post("/auth/2fa/disable", { token, backupCode });
  return data;
};

