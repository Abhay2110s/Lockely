// Application constants — shared enums and configuration
// values used across the codebase for categories, OTP types,
// sort options, and password strength levels.
export const DEFAULT_CATEGORIES = [
  "Work",
  "Banking",
  "Social",
  "Shopping",
  "Gaming",
  "General",
];

export const SORT_OPTIONS = {
  LATEST: "latest",
  OLDEST: "oldest",
  ALPHABETICAL: "alphabetical",
  STRENGTH: "strength",
};

export const STRENGTH_LEVELS = [
  "Very Weak",
  "Weak",
  "Medium",
  "Strong",
  "Very Strong",
];

export const WEAK_STRENGTH_LEVELS = ["Very Weak", "Weak"];
export const STRONG_STRENGTH_LEVELS = ["Strong", "Very Strong"];
