import { describe, it, expect } from "vitest";
import {
  deriveVaultKey,
  encryptSecret,
  decryptSecret,
  computePasswordHash,
} from "../services/crypto.service.js";

describe("Client Crypto Service (Zero-Knowledge AES-256-GCM)", () => {
  // A sample 32-byte hex salt
  const sampleSaltHex = "a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90";
  const masterPassword = "MySuperSecretMasterPassword!2026";

  it("derives a non-exportable CryptoKey using PBKDF2", async () => {
    const key = await deriveVaultKey(masterPassword, sampleSaltHex);
    expect(key).toBeDefined();
    expect(key.type).toBe("secret");
    expect(key.algorithm.name).toBe("AES-GCM");
    expect(key.extractable).toBe(false);
  });

  it("encrypts and decrypts a secret back to exact plaintext", async () => {
    const key = await deriveVaultKey(masterPassword, sampleSaltHex);
    const secret = "TopSecretAPIKey_12345!@#$%^&*()";

    const encrypted = await encryptSecret(secret, key);
    expect(encrypted.cipherText).toBeDefined();
    expect(encrypted.iv).toBeDefined();
    expect(encrypted.authTag).toBeDefined();

    const decrypted = await decryptSecret(encrypted, key);
    expect(decrypted).toBe(secret);
  });

  it("fails decryption when authTag is corrupted (tamper detection)", async () => {
    const key = await deriveVaultKey(masterPassword, sampleSaltHex);
    const secret = "SensitiveData";

    const encrypted = await encryptSecret(secret, key);

    // Tamper with the authTag (change first character)
    const tamperedTag = encrypted.authTag.startsWith("A") ? "B" + encrypted.authTag.slice(1) : "A" + encrypted.authTag.slice(1);
    const tamperedBlob = {
      ...encrypted,
      authTag: tamperedTag,
    };

    await expect(decryptSecret(tamperedBlob, key)).rejects.toThrow();
  });

  it("fails decryption when a different key is used", async () => {
    const key1 = await deriveVaultKey("Password123!", sampleSaltHex);
    const key2 = await deriveVaultKey("DifferentPassword456!", sampleSaltHex);

    const encrypted = await encryptSecret("SecretData", key1);
    await expect(decryptSecret(encrypted, key2)).rejects.toThrow();
  });

  it("computes SHA-256 reuse hash consistently", async () => {
    const hash1 = await computePasswordHash("password123");
    const hash2 = await computePasswordHash("password123");
    const hash3 = await computePasswordHash("differentPassword");

    expect(hash1).toHaveLength(64);
    expect(hash1).toBe(hash2);
    expect(hash1).not.toBe(hash3);
  });
});
