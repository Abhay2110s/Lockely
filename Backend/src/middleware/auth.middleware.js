// Authentication middleware — verifies a JWT sent as either:
//   1. The `pg_auth` httpOnly cookie (browser sessions — preferred, most secure).
//   2. `Authorization: Bearer <token>` header (API clients, Postman, mobile apps).
// Cookie is always preferred when present. Header fallback is intentional to
// avoid breaking non-browser clients while the cookie-based flow is the norm
// for the web app. Document this fallback clearly so it isn't removed silently.
// On success, attaches { id } to req.user where `id` is the
// MongoDB User._id string — used everywhere as the owning-user key.
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyAuth = asyncHandler(async (req, res, next) => {
  // Prefer cookie (httpOnly — XSS-safe) over header.
  const cookieToken = req.cookies?.pg_auth ?? null;

  // Fallback: Authorization: Bearer <token> (for non-browser API clients).
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    throw ApiError.unauthorized("Unauthorized. Please sign in.");
  }

  let payload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET);
  } catch (err) {
    throw ApiError.unauthorized("Invalid or expired session. Please sign in again.");
  }

  if (!payload?.userId) {
    throw ApiError.unauthorized("Invalid token payload.");
  }

  req.user = { id: payload.userId };
  next();
});

// Optional authentication middleware — attaches user if valid token exists,
// but does not throw 401 if unauthenticated (useful for session status checks like /auth/me).
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const cookieToken = req.cookies?.pg_auth ?? null;
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = cookieToken || bearerToken;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (payload?.userId) {
      req.user = { id: payload.userId };
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }

  next();
});

export default verifyAuth;
