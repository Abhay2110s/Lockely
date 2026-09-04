// Environment configuration — loads .env via dotenv and exports a
// normalized, validated config object used throughout the application.
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(".env") });

// Normalize and provide sensible defaults for every configuration value,
// ensuring Vercel serverless functions never crash on missing variables.
const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "production",
  CLIENT_URL: process.env.CLIENT_URL || "https://lockelyfrontend.vercel.app",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://abhaysingh14922_db_user:UZQjTXNJW2PWntj3@cluster0.rjx9wnc.mongodb.net/PassGaurdian?retryWrites=true&w=majority",
  ENCRYPTION_KEY:
    process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length === 32
      ? process.env.ENCRYPTION_KEY
      : "K8mP2xQ9vL4nR7tY5uW3cZ1aB6dF0hJs",
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "your_super_secret_jwt_key_change_this_in_production_32chars_min",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  PASSWORD_EXPIRY_DAYS: Number(process.env.PASSWORD_EXPIRY_DAYS) || 90,
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || "wearebest400@gmail.com",
  SMTP_PASS: process.env.SMTP_PASS || "aeqyeonhommjalui",
  EMAIL_FROM: process.env.EMAIL_FROM || "Lockely <wearebest400@gmail.com>",
};

export default env;
