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
  "JWT_SECRET",
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
  // JWT auth — signs and verifies access tokens issued at login.
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  PASSWORD_EXPIRY_DAYS: Number(process.env.PASSWORD_EXPIRY_DAYS) || 90,
  // SMTP for sending OTP and password-reset emails.
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "PassGuardian <noreply@passguardian.app>",
};

export default env;
