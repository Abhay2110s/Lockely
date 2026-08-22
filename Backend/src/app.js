// Express application setup — configures middleware, routes, and error handling
// for the PassGuardian API server.
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import env from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import passwordRoutes from "./routes/password.routes.js";
import vaultRoutes from "./routes/vault.routes.js";
import userRoutes from "./routes/user.routes.js";
import folderRoutes from "./routes/folder.routes.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { apiLimiter } from "./middleware/rateLimiter.middleware.js";
import sanitizeRequest from "./middleware/sanitize.middleware.js";
import logger from "./utils/logger.js";
import swaggerSpec from "./config/swagger.js";
import connectDB from "./config/db.js";


const app = express();

// Apply security-related HTTP headers to every response.
app.use(helmet());

// CORS — supports a comma-separated CLIENT_URL list, and allows
// same-origin/no-origin requests (curl, mobile apps, server-to-server).
// Set CLIENT_URL in your deployment's environment variables (e.g.
// "https://your-frontend.vercel.app") to allow it. If CLIENT_URL is not
// set at all, we fall back to localhost so local development still works.
const configuredOrigins = (env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : ["http://localhost:5173", "http://localhost:3000"];

// Remove duplicates while preserving the configured origins.
const uniqueAllowedOrigins = [...new Set(allowedOrigins)];

// Vercel gives every preview deploy its own unique subdomain
// (e.g. "pass-gaurdian-12-7dujbxixu-abhay2110s-projects.vercel.app"),
// so a static CLIENT_URL list can never cover them all. This pattern
// allows any preview URL belonging to this specific Vercel project/team
// without opening CORS up to arbitrary third-party origins. Adjust the
// project/team slugs below if your Vercel project or team name changes.
const VERCEL_PREVIEW_ORIGIN = /^https:\/\/pass-gaurdian(-[a-z0-9]+)*-abhay2110s-projects\.vercel\.app$/i;

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        uniqueAllowedOrigins.length === 0 ||
        uniqueAllowedOrigins.includes(origin) ||
        VERCEL_PREVIEW_ORIGIN.test(origin)
      ) {
        return callback(null, true);
      }
      // Reject with `false` (not an Error) so the `cors` package simply
      // omits the Access-Control-Allow-Origin header instead of throwing,
      // which previously fell through to the generic error handler and
      // surfaced as a confusing 500. The browser's own CORS check is what
      // actually blocks the response — this just avoids masking it.
      logger.warn(`Blocked CORS request from disallowed origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);

// HTTP request logging — always on, routed through winston.
app.use(morgan("combined", { stream: logger.stream }));

// Parse incoming JSON bodies (limited to 1 MB) and URL-encoded form data.
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Parse cookies attached to incoming requests.
app.use(cookieParser());

// Strip NoSQL-injection operator keys and raw HTML from parsed input.
app.use(sanitizeRequest);

// Compress response bodies for all requests to reduce bandwidth usage.
app.use(compression());

// Global API rate limiting — auth routes have their own stricter limiters.
app.use("/api", apiLimiter);

// Serve Swagger UI documentation at /api-docs.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health-check endpoint used by load balancers and monitoring tools.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PassGuardian API is running 🚀",
  });
});

// Ensure MongoDB is connected before any database-backed API route runs.
// This middleware is intentionally registered BEFORE the route groups so that
// Vercel serverless requests cannot reach User.findOne()/create() while
// Mongoose is still connecting.
app.use("/api/v1", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Mount versioned route groups under /api/v1.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/vault", vaultRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/folders", folderRoutes);

// Catch unmatched routes and forward to the centralized error handler.
app.use(notFound);
app.use(errorHandler);

export default app;
