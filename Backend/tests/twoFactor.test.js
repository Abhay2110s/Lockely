import { describe, it, expect } from "vitest";
import { generateSecret, generateURI, generateSync, verify } from "otplib";

describe("Two-Factor Authentication Logic (otplib v13)", () => {
  it("generates a valid base32 secret and standard otpauth URI", () => {
    const secret = generateSecret();
    expect(secret).toBeDefined();
    expect(typeof secret).toBe("string");
    expect(secret.length).toBeGreaterThan(16);

    const uri = generateURI({
      issuer: "Lockely",
      label: "user@example.com",
      secret,
    });

    expect(uri).toContain("otpauth://totp/Lockely:user%40example.com");
    expect(uri).toContain(`secret=${secret}`);
  });

  it("verifies a valid TOTP token generated with the secret", async () => {
    const secret = generateSecret();
    const token = generateSync({ secret });

    const result = await verify({ token, secret });
    expect(result).toBeDefined();
    expect(result.valid).toBe(true);
  });

  it("rejects an invalid TOTP token", async () => {
    const secret = generateSecret();
    const result = await verify({ token: "000000", secret });
    expect(result.valid).toBe(false);
  });
});
