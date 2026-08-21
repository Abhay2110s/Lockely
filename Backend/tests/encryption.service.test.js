import { describe, it, expect } from "vitest";
import { hashForComparison, validateCiphertextBlob } from "../src/services/encryption.service.js";

describe("Encryption Service (Zero-Knowledge Validation Layer)", () => {
  describe("hashForComparison", () => {
    it("should return a 64-character hex SHA-256 string", () => {
      const hash = hashForComparison("mySecretPassword123!");
      expect(hash).toHaveLength(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it("should return deterministic hash for identical inputs", () => {
      const hash1 = hashForComparison("samePassword");
      const hash2 = hashForComparison("samePassword");
      expect(hash1).toBe(hash2);
    });

    it("should return different hashes for different inputs", () => {
      const hash1 = hashForComparison("passwordA");
      const hash2 = hashForComparison("passwordB");
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("validateCiphertextBlob", () => {
    it("should pass for a valid ciphertext blob", () => {
      expect(() => {
        validateCiphertextBlob({
          cipherText: "dGVzdENpcGhlcg==",
          iv: "MTIzNDU2Nzg5MDEy",
          authTag: "YXV0aFRhZzEyMzQ1Ng==",
        });
      }).not.toThrow();
    });

    it("should throw when cipherText is missing", () => {
      expect(() => {
        validateCiphertextBlob({
          iv: "MTIzNDU2Nzg5MDEy",
          authTag: "YXV0aFRhZzEyMzQ1Ng==",
        });
      }).toThrow(/cipherText/i);
    });

    it("should throw when iv is missing", () => {
      expect(() => {
        validateCiphertextBlob({
          cipherText: "dGVzdENpcGhlcg==",
          authTag: "YXV0aFRhZzEyMzQ1Ng==",
        });
      }).toThrow(/iv/i);
    });

    it("should throw when authTag is missing", () => {
      expect(() => {
        validateCiphertextBlob({
          cipherText: "dGVzdENpcGhlcg==",
          iv: "MTIzNDU2Nzg5MDEy",
        });
      }).toThrow(/authTag/i);
    });
  });
});
