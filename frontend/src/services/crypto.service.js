/**
 * Vault Crypto Service — client-side AES-256-GCM encryption for vault secrets.
 *
 * Architecture (Zero-Knowledge):
 *   1. At registration/login, the server returns a `vaultKeySalt` (random 32-byte hex).
 *   2. The browser derives a 256-bit AES-GCM key using PBKDF2:
 *        key = PBKDF2(masterPassword, vaultKeySalt, iterations=210_000, hash="SHA-256")
 *   3. Vault secrets are encrypted with this key before being sent to the API.
 *   4. The server stores ciphertext/iv/authTag blobs only — it never sees plaintext
 *      passwords or the derived key.
 *   5. On logout the derived key is dropped from memory (it lives only in this module's
 *      closure and is never persisted to disk or localStorage).
 *
 * Why 210,000 PBKDF2 iterations?
 *   OWASP 2023 recommendation for PBKDF2-SHA256. High enough to slow offline
 *   brute-force attacks while still completing in < 1 second on modern hardware.
 */

const PBKDF2_ITERATIONS = 210_000;
const KEY_ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;
const IV_LENGTH = 12; // 96-bit IV is the GCM standard

// ─── Key Derivation ──────────────────────────────────────────────────────────

/**
 * Derive a CryptoKey from the user's master password and their stored salt.
 * @param {string} masterPassword  — the user's login password
 * @param {string} saltHex         — hex-encoded vaultKeySalt from the server
 * @returns {Promise<CryptoKey>}   — AES-256-GCM key, not exportable
 */
export const deriveVaultKey = async (masterPassword, saltHex) => {
  const enc = new TextEncoder();
  const salt = hexToBytes(saltHex);

  // Import the password as a raw key material for PBKDF2.
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(masterPassword),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: KEY_ALGORITHM, length: KEY_LENGTH },
    false, // not exportable — the raw key bytes never leave the CryptoKey object
    ["encrypt", "decrypt"]
  );
};

// ─── Encrypt ─────────────────────────────────────────────────────────────────

/**
 * Encrypt a plaintext string with the vault key.
 * @param {string}     plaintext  — the secret to encrypt
 * @param {CryptoKey}  vaultKey   — derived via deriveVaultKey()
 * @returns {Promise<{ cipherText: string, iv: string, authTag: string }>}
 *           All values are base64-encoded for JSON transport.
 *           Note: Web Crypto's AES-GCM appends the 16-byte auth tag to the
 *           ciphertext; we split it out here to match the server's storage schema.
 */
export const encryptSecret = async (plaintext, vaultKey) => {
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const combined = await crypto.subtle.encrypt(
    { name: KEY_ALGORITHM, iv },
    vaultKey,
    enc.encode(plaintext)
  );

  // Web Crypto appends the 16-byte GCM auth tag to the end of the ciphertext.
  const combinedBytes = new Uint8Array(combined);
  const ciphertextBytes = combinedBytes.slice(0, -16);
  const authTagBytes = combinedBytes.slice(-16);

  return {
    cipherText: bytesToBase64(ciphertextBytes),
    iv: bytesToBase64(iv),
    authTag: bytesToBase64(authTagBytes),
  };
};

// ─── Decrypt ─────────────────────────────────────────────────────────────────

/**
 * Decrypt a ciphertext blob produced by encryptSecret().
 * @param {{ cipherText: string, iv: string, authTag: string }} blob
 * @param {CryptoKey} vaultKey
 * @returns {Promise<string>} plaintext
 * @throws if the auth tag doesn't match (tampered or wrong key)
 */
export const decryptSecret = async ({ cipherText, iv, authTag }, vaultKey) => {
  const ciphertextBytes = base64ToBytes(cipherText);
  const authTagBytes = base64ToBytes(authTag);
  const ivBytes = base64ToBytes(iv);

  // Re-combine ciphertext + auth tag for Web Crypto (it expects them concatenated).
  const combined = new Uint8Array(ciphertextBytes.length + authTagBytes.length);
  combined.set(ciphertextBytes);
  combined.set(authTagBytes, ciphertextBytes.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: KEY_ALGORITHM, iv: ivBytes },
    vaultKey,
    combined
  );

  return new TextDecoder().decode(decrypted);
};

// ─── Reuse Hash ──────────────────────────────────────────────────────────────

/**
 * Compute SHA-256 of a password for server-side reuse detection.
 * The server stores this hash and uses it to detect duplicate passwords
 * across vault entries without ever seeing the plaintext.
 * @param {string} plaintext
 * @returns {Promise<string>} hex-encoded SHA-256 hash
 */
export const computePasswordHash = async (plaintext) => {
  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(plaintext));
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const bytesToBase64 = (bytes) =>
  btoa(String.fromCharCode(...bytes));

const base64ToBytes = (b64) =>
  new Uint8Array(atob(b64).split("").map((c) => c.charCodeAt(0)));

const hexToBytes = (hex) =>
  new Uint8Array(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
