// Environment configuration — loads .env via dotenv and exports a
// normalized, validated config object used throughout the application.
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(".env") });

// These variables must be present for the server to start; exit immediately
// if any are missing so misconfiguration is caught early.
const required = [
  "MONGODB_URI",
  "ENCRYPTION_KEY",
  "CLERK_SECRET_KEY",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  // eslint-disable-next-line no-console
  console.error(
    `❌ Missing required environment variables: ${missing.join(", ")}`
  );
  process.exit(1);
}

// ENCRYPTION_KEY must be exactly 32 bytes for AES-256.
if (process.env.ENCRYPTION_KEY.length !== 32) {
  // eslint-disable-next-line no-console
  console.error(
    "❌ ENCRYPTION_KEY must be exactly 32 characters long (AES-256 key)."
  );
  process.exit(1);
}

// Normalize and provide sensible defaults for every configuration value.
const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "production",
  CLIENT_URL: process.env.CLIENT_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  // Clerk verifies session tokens sent as `Authorization: Bearer <token>`.
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  PASSWORD_EXPIRY_DAYS: Number(process.env.PASSWORD_EXPIRY_DAYS) || 90,
};

export default env;
