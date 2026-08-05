// Centralized error-handling middleware — catches all errors thrown
// anywhere in the request lifecycle and returns a consistent JSON
// response. Also handles Mongoose-specific error shapes.
import env from "../config/env.js";
import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

// Catch 404s for routes that were not matched by any router.
export const notFound = (req, res, next) => {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong.";
  let details = err.details || null;

  // Mongoose validation errors — extract per-field messages.
  if (err.name === "ValidationError") {
    statusCode = 400;
    details = Object.values(err.errors).map((e) => e.message);
    message = "Validation failed.";
  }

  // Mongoose duplicate key error — identify the conflicting field.
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0];
    message = field ? `${field} already exists.` : "Duplicate value.";
  }

  // Mongoose invalid ObjectId passed in a route parameter.
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Log server errors at error level; client errors at warn level.
  if (statusCode >= 500) {
    logger.error(err.message, { stack: err.stack });
  } else {
    logger.warn(err.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {}),
    // Include the stack trace only in development so it is not
    // leaked to production clients.
    ...(env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};

export default errorHandler;
