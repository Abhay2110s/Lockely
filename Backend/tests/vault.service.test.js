import { describe, it, expect } from "vitest";
import { toSafeEntry } from "../src/services/vault.service.js";

describe("Vault Service Logic", () => {
  it("toSafeEntry formats document into safe zero-knowledge response", () => {
    const mockDoc = {
      toObject: () => ({
        _id: "60d0fe4f5311236168a109ca",
        title: "GitHub",
        website: "github.com",
        url: "https://github.com",
        username: "johndoe",
        email: "john@example.com",
        cipherText: "dGVzdENpcGhlcg==",
        iv: "MTIzNDU2Nzg5MDEy",
        authTag: "YXV0aFRhZzEyMzQ1Ng==",
        category: "Work",
        favorite: true,
        strength: { score: 85, label: "Very Strong", entropy: 72 },
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    };

    const safe = toSafeEntry(mockDoc);

    expect(safe.id).toBe("60d0fe4f5311236168a109ca");
    expect(safe.title).toBe("GitHub");
    expect(safe.cipherText).toBe("dGVzdENpcGhlcg==");
    expect(safe.iv).toBe("MTIzNDU2Nzg5MDEy");
    expect(safe.authTag).toBe("YXV0aFRhZzEyMzQ1Ng==");
    expect(safe).not.toHaveProperty("password"); // Server never exposes plaintext
  });

  it("regex characters in search terms do not throw SyntaxError", () => {
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const dangerousInput = "user(name)[test]*+?";
    const escaped = escapeRegExp(dangerousInput);

    expect(() => new RegExp(escaped, "i")).not.toThrow();
  });

  it("reuse detection correctly groups identical password hashes", () => {
    const computeReuseGroups = (entries) => {
      const groups = new Map();
      entries.forEach((entry) => {
        const key = entry.passwordHash;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(entry);
      });
      return [...groups.values()].filter((group) => group.length > 1);
    };

    const sampleEntries = [
      { id: "1", title: "Site A", passwordHash: "hash1" },
      { id: "2", title: "Site B", passwordHash: "hash2" },
      { id: "3", title: "Site C", passwordHash: "hash1" },
      { id: "4", title: "Site D", passwordHash: "hash3" },
      { id: "5", title: "Site E", passwordHash: "hash1" },
    ];

    const reuseGroups = computeReuseGroups(sampleEntries);
    expect(reuseGroups).toHaveLength(1);
    expect(reuseGroups[0]).toHaveLength(3);
    expect(reuseGroups[0].map((e) => e.title)).toEqual(["Site A", "Site C", "Site E"]);
  });
});
