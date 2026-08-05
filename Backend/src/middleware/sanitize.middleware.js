// Request sanitization middleware — defends against NoSQL-injection
// payloads (e.g. { "email": { "$gt": "" } }) by stripping any object key
// that could be interpreted as a Mongo query operator or a dot-path
// traversal before the body ever reaches a Mongoose query or validator.
//
// No external package is used here: express-mongo-sanitize's approach
// (recursively removing keys that start with "$" or contain ".") is
// simple enough to inline, and doing so avoids adding a new dependency
// for a handful of lines of logic.
//
// Deliberately NOT stripping HTML/script tags from string values: several
// fields on this API (password, newPassword, notes, backup codes, ...)
// must be stored byte-for-byte as the user entered them — a vault secret
// containing "<" or ">" would otherwise get silently corrupted before
// encryption. XSS protection belongs at render time (the frontend must
// escape stored content when displaying it), not by mutating stored data.

// Matches keys that could be interpreted as Mongo query operators or
// dot-path traversals when an object reaches a Mongoose query unfiltered.
const isDangerousKey = (key) => key.startsWith("$") || key.includes(".");

const sanitizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    return sanitizeObject(value);
  }

  return value;
};

// Rebuilds a plain object with dangerous keys dropped and every
// remaining value recursively sanitized.
const sanitizeObject = (obj) => {
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (isDangerousKey(key)) continue;
    clean[key] = sanitizeValue(value);
  }
  return clean;
};

// Sanitizes req.body and req.params in place. req.query is intentionally
// left untouched: Express 5 exposes req.query as a getter-only property
// on the underlying request, so it cannot be reassigned here — but
// vault.service.js only ever reads a fixed set of known keys off
// req.query (search, category, favorite, weak, expired, sortBy, page,
// limit) and builds its Mongoose filter from those individually, rather
// than spreading req.query straight into a query, so it isn't exposed to
// operator-injection the way an unfiltered body/params object would be.
const sanitizeRequest = (req, res, next) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeObject(req.body);
  }
  if (req.params && typeof req.params === "object") {
    req.params = sanitizeObject(req.params);
  }
  next();
};

export default sanitizeRequest;
