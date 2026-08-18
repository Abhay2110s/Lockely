import api from "./api";

/**
 * Auth Service — manual JWT auth calls to the backend.
 */

/** Create a new account. Backend sends a verification OTP to the email. */
export const register = async ({ name, email, password }) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

/** Verify the email OTP. Returns { token, user } on success. */
export const verifyOTP = async ({ email, otp }) => {
  const { data } = await api.post("/auth/verify-otp", { email, otp });
  return data;
};

/** Login with email + password. Returns { token, user } on success. */
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

/** Get the currently authenticated user's profile. */
export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

/**
 * Check if a password has been compromised via k-anonymity API.
 * @param {string} password - The raw password to check
 * @returns {{ compromised: boolean, count: number }}
 */
export const checkPasswordBreach = async (password) => {
  const encoder = new TextEncoder();
  const buf = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", buf);
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
