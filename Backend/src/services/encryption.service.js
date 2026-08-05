// Encryption service — AES-256-GCM symmetric encryption for
// vault secrets, plus a one-way SHA-256 hash for reuse detection.
import crypto from "crypto";
import env from "../config/env.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // recommended IV length for GCM

// ENCRYPTION_KEY is validated (32 chars) at startup in config/env.js
const KEY = Buffer.from(env.ENCRYPTION_KEY, "utf8");

/**
 * Encrypts a plaintext string.
 * Returns the ciphertext, the IV used, and the GCM auth tag —
 * all of which must be stored to decrypt later.
 */
export const encrypt = (plainText) => {
  if (plainText === undefined || plainText === null) {
    return null;
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(String(plainText), "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    cipherText: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
};

/**
 * Decrypts a value previously produced by `encrypt`.
 */
export const decrypt = ({ cipherText, iv, authTag }) => {
  if (!cipherText || !iv || !authTag) {
    return null;
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    KEY,
    Buffer.from(iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(authTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(cipherText, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

/**
 * One-way hash used purely for reuse detection — lets us compare
 * whether two vault entries share the same underlying password
 * without ever decrypting either of them.
 */
export const hashForComparison = (plainText) => {
  return crypto
    .createHash("sha256")
    .update(String(plainText))
    .digest("hex");
};
