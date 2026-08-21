// Encryption service — now acts as a thin validation layer only.
//
// ┌─ Architecture Change (Zero-Knowledge) ──────────────────────────────────────┐
// │ Vault secrets are encrypted CLIENT-SIDE using AES-256-GCM before being     │
// │ sent to the API. The server stores and returns ciphertext blobs only —      │
// │ it never sees plaintext passwords or the derived vault key.                 │
// │                                                                             │
// │ Key derivation: PBKDF2(masterPassword, vaultKeySalt) in the browser.        │
// │ vaultKeySalt is a per-user random salt stored on the User document.         │
// │                                                                             │
// │ hashForComparison is kept server-side (SHA-256 of plaintext) because:       │
// │   - A one-way hash is not the plaintext — it cannot be decrypted.           │
// │   - Reuse detection across vault entries would be impossible client-side    │
// │     (you'd need to decrypt all entries to compare, defeating the model).    │
// │   - The hash is computed client-side before sending, so the server still    │
// │     never sees the plaintext password — only its SHA-256 fingerprint.       │
// └─────────────────────────────────────────────────────────────────────────────┘
import crypto from "crypto";

/**
 * One-way hash used purely for reuse detection.
 * Lets us compare whether two vault entries share the same underlying password
 * without ever decrypting either of them.
 * Computed CLIENT-SIDE and sent with each create/update; stored server-side.
 */
export const hashForComparison = (plainText) => {
  return crypto
    .createHash("sha256")
    .update(String(plainText))
    .digest("hex");
};

/**
 * Validate that a ciphertext blob from the client has all required fields.
 * Throws if any field is missing — prevents partial/corrupt blobs from being stored.
 */
export const validateCiphertextBlob = ({ cipherText, iv, authTag }) => {
  if (!cipherText || !iv || !authTag) {
    throw new Error("Invalid ciphertext blob: cipherText, iv, and authTag are all required.");
  }
};
