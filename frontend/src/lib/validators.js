/**
 * Validators — input validation functions for forms.
 * All validators return { valid: boolean, message: string } for uniform usage.
 */

/**
 * Validate an email address.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export const validateEmail = (email) => {
  if (!email?.trim()) {
    return { valid: false, message: "Email is required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: "Please enter a valid email address." };
  }
  return { valid: true, message: "" };
};

/**
 * Validate a master password for registration.
 * Requires: 8+ chars, uppercase, number, special character.
 * @param {string} password
 * @returns {{ valid: boolean, message: string, score: number }}
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: "Password is required.", score: 0 };
  }
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters.", score: 0 };
  }

  let score = 0;
  const issues = [];

  if (!/[A-Z]/.test(password)) {
    issues.push("an uppercase letter");
  } else {
    score++;
  }
  if (!/[0-9]/.test(password)) {
    issues.push("a number");
  } else {
    score++;
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    issues.push("a special character");
  } else {
    score++;
  }

  if (issues.length > 0) {
    return {
      valid: false,
      message: `Add ${issues.join(", ")} to make your password stronger.`,
      score,
    };
  }

  return { valid: true, message: "", score: score + 1 };
};

/**
 * Validate that two passwords match.
 * @param {string} password
 * @param {string} confirm
 * @returns {{ valid: boolean, message: string }}
 */
export const validatePasswordMatch = (password, confirm) => {
  if (password !== confirm) {
    return { valid: false, message: "Passwords do not match." };
  }
  return { valid: true, message: "" };
};

/**
 * Validate a URL (must start with http:// or https://).
 * @param {string} url
 * @param {boolean} [required=false]
 * @returns {{ valid: boolean, message: string }}
 */
export const validateUrl = (url, required = false) => {
  if (!url?.trim()) {
    if (required) return { valid: false, message: "URL is required." };
    return { valid: true, message: "" };
  }
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    if (!["http:", "https:"].includes(u.protocol)) {
      return { valid: false, message: "URL must use http or https." };
    }
    return { valid: true, message: "" };
  } catch {
    return { valid: false, message: "Please enter a valid URL." };
  }
};

/**
 * Validate a required text field.
 * @param {string} value
 * @param {string} [fieldName="This field"]
 * @returns {{ valid: boolean, message: string }}
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (!value?.trim()) {
    return { valid: false, message: `${fieldName} is required.` };
  }
  return { valid: true, message: "" };
};
