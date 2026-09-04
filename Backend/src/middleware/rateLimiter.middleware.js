// Rate-limiting middleware — general API request limiter to protect
// the API from abuse.
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
