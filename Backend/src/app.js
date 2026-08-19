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
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import { apiLimiter } from "./middleware/rateLimiter.middleware.js";
import sanitizeRequest from "./middleware/sanitize.middleware.js";
import logger from "./utils/logger.js";
import swaggerSpec from "./config/swagger.js";

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

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || uniqueAllowedOrigins.length === 0 || uniqueAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
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

// Mount versioned route groups under /api/v1.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/password", passwordRoutes);
app.use("/api/v1/vault", vaultRoutes);

// Catch unmatched routes and forward to the centralized error handler.
app.use(notFound);
app.use(errorHandler);

export default app;
