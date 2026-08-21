/**
 * App-wide constants — single source of truth for routes, categories,
 * storage keys, and default configuration values.
 */

// ─── Routes ──────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_OTP: "/verify-otp",
  VERIFY_2FA: "/verify-2fa",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  VAULT: "/vault",
  GENERATOR: "/generator",
  PROFILE: "/profile",
  SETTINGS: "/settings",
};

// ─── localStorage Keys ────────────────────────────────────────────────────────

export const STORAGE_KEYS = {
  USER: "pg_user",
  THEME: "pg_theme",
  VAULT_SORT: "pg_vault_sort",
  VAULT_VIEW: "pg_vault_view",
};

// ─── Vault Categories ─────────────────────────────────────────────────────────

export const CATEGORIES = [
  "General",
  "Social",
  "Finance",
  "Email",
  "Work",
  "Gaming",
  "Shopping",
  "Travel",
  "Health",
  "Other",
];

// ─── Password Strength Labels ─────────────────────────────────────────────────

export const STRENGTH_LABELS = {
  VERY_WEAK: "Very Weak",
  WEAK: "Weak",
  MEDIUM: "Medium",
  STRONG: "Strong",
  VERY_STRONG: "Very Strong",
};

export const STRENGTH_COLORS = {
  "Very Weak": "text-rose-500",
  Weak: "text-orange-500",
  Medium: "text-amber-500",
  Strong: "text-blue-500",
  "Very Strong": "text-emerald-500",
};

export const STRENGTH_BG_COLORS = {
  "Very Weak": "bg-rose-500",
  Weak: "bg-orange-500",
  Medium: "bg-amber-500",
  Strong: "bg-blue-500",
  "Very Strong": "bg-emerald-500",
};

// ─── Security Defaults ────────────────────────────────────────────────────────

export const DEFAULT_SECURITY_PREFS = {
  autoLockMinutes: 15,
  clipboardClearSeconds: 30,
  enable2FA: false,
};

// ─── Password Expiry ─────────────────────────────────────────────────────────

export const PASSWORD_EXPIRY_OPTIONS = [30, 60, 90, 180, 365, 0]; // 0 = never
