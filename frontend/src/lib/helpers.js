/**
 * Helpers — general-purpose utility functions used across the app.
 */

// ─── Time & Date ─────────────────────────────────────────────────────────────

/**
 * Format a date as a human-readable relative time string.
 * @param {string|Date} date
 * @returns {string}  e.g. "2 hours ago", "3 days ago", "just now"
 */
export const formatRelativeTime = (date) => {
  if (!date) return "—";

  const now = Date.now();
  const then = new Date(date).getTime();
  const diffMs = now - then;

  if (isNaN(diffMs)) return "—";

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes === 1) return "1 minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return "1 week ago";
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;
  if (years === 1) return "1 year ago";
  return `${years} years ago`;
};

/**
 * Format a date as a short locale date string.
 * @param {string|Date} date
 * @returns {string} e.g. "Aug 21, 2026"
 */
export const formatDate = (date) => {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
};

// ─── String ──────────────────────────────────────────────────────────────────

/**
 * Truncate a string to `maxLength` characters, appending "…" if truncated.
 * @param {string} str
 * @param {number} [maxLength=40]
 * @returns {string}
 */
export const truncate = (str, maxLength = 40) => {
  if (!str || str.length <= maxLength) return str ?? "";
  return `${str.slice(0, maxLength)}…`;
};

/**
 * Extract initials from a full name (up to 2 characters).
 * Falls back to the first character of the email if name is empty.
 * @param {string} name
 * @param {string} [fallback="?"]
 * @returns {string}
 */
export const getInitials = (name, fallback = "?") => {
  if (!name?.trim()) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ─── Clipboard ───────────────────────────────────────────────────────────────

/**
 * Copy text to the clipboard.
 * Silently fails if the Clipboard API is unavailable (insecure context).
 * @param {string} text
 * @returns {Promise<boolean>} true if successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(String(text));
    return true;
  } catch {
    return false;
  }
};

// ─── URL ─────────────────────────────────────────────────────────────────────

/**
 * Extract the hostname from a URL for display purposes.
 * @param {string} url
 * @returns {string}  e.g. "github.com" or the original string if parsing fails
 */
export const extractHostname = (url) => {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/**
 * Generate a favicon URL for a given website URL via Google's favicon service.
 * @param {string} url  — full URL or domain
 * @returns {string}
 */
export const getFaviconUrl = (url) => {
  if (!url) return null;
  const hostname = extractHostname(url);
  if (!hostname) return null;
  return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
};

// ─── Numbers ─────────────────────────────────────────────────────────────────

/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
