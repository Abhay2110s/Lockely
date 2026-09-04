// Rate-limiting middleware — defines three tiers of request limits
// to protect the API from abuse: a general API limiter, a stricter
// auth limiter, and a very strict OTP limiter to prevent email spam.
import rateLimit from "express-rate-limit";

// Custom JSON response handler so rate-limit errors are consistent
// with the rest of the API's error format.
const jsonHandler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    success: false,
    message: options.message,
  });
};

// General limiter applied to all /api routes.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests. Please try again later.",
  handler: jsonHandler,
  validate: { trustProxy: false },
});

// Stricter limiter for sensitive auth endpoints (login, register, OTP, reset).
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many attempts. Please try again in a few minutes.",
  handler: jsonHandler,
  validate: { trustProxy: false },
});

// Very strict limiter for OTP / reset-link sending to prevent email spam abuse.
export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many OTP requests. Please wait a few minutes before retrying.",
  handler: jsonHandler,
  validate: { trustProxy: false },
});
