// Express application setup — configures middleware, routes, and error handling
// for the Lockely API server.
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

// Trust Vercel reverse proxy headers for rate limiting and IP resolution.
app.set("trust proxy", 1);

// Apply security-related HTTP headers to every response.
app.use(helmet());

// CORS configuration — supports configured CLIENT_URL list, all *.vercel.app origins,
// localhost for development, and requests with no origin.
const configuredOrigins = (env.CLIENT_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://lockelyfrontend.vercel.app",
        "https://pass-gaurdian.vercel.app",
      ];

// Remove duplicates while preserving configured origins.
const uniqueAllowedOrigins = [...new Set(allowedOrigins)];

// Match ANY vercel.app origin (production deployments, preview URLs, custom subdomains).
const VERCEL_ORIGIN_REGEX = /^https:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.vercel\.app$/i;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      // Allow configured origins
      if (uniqueAllowedOrigins.includes(origin)) return callback(null, true);

      // Allow any *.vercel.app frontend or preview deployment
      if (VERCEL_ORIGIN_REGEX.test(origin)) return callback(null, true);

      // Allow local development ports
      if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return callback(null, true);
      }

      logger.warn(`Blocked CORS request from disallowed origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
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
app.use(["/api", "/v1"], apiLimiter);

// Serve Swagger UI documentation at /api-docs (guarded safely for serverless environments).
app.use("/api-docs", (req, res, next) => {
  try {
    if (swaggerUi && swaggerUi.serve && swaggerUi.setup) {
      return swaggerUi.serve[0](req, res, () => {
        swaggerUi.setup(swaggerSpec)(req, res, next);
      });
    }
  } catch {
    // Fall back gracefully if swagger UI static assets are missing
  }
  return res.status(200).json({ success: true, message: "Lockely API Specification", spec: swaggerSpec });
});

// Health-check endpoint used by load balancers and monitoring tools.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lockely API is running 🚀",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lockely API is running 🚀",
  });
});

// Ensure MongoDB is connected before any database-backed API route runs.
// Mount on both /api/v1 and /v1 for Vercel routing compatibility.
app.use(["/api/v1", "/v1"], async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Mount versioned route groups under both /api/v1 AND /v1.
app.use(["/api/v1/auth", "/v1/auth"], authRoutes);
app.use(["/api/v1/password", "/v1/password"], passwordRoutes);
app.use(["/api/v1/vault", "/v1/vault"], vaultRoutes);
app.use(["/api/v1/users", "/v1/users"], userRoutes);
app.use(["/api/v1/folders", "/v1/folders"], folderRoutes);

// Catch unmatched routes and forward to the centralized error handler.
app.use(notFound);
app.use(errorHandler);

export default app;
