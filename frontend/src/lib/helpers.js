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
