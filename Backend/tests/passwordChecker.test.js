import { describe, it, expect } from "vitest";
import { checkPasswordStrength } from "../src/utils/passwordChecker.js";

describe("Password Strength Checker", () => {
  it("scores very weak passwords appropriately", () => {
    const res = checkPasswordStrength("123");
    expect(res.strength).toBe("Very Weak");
    expect(res.score).toBeLessThan(25);
    expect(res.feedback.length).toBeGreaterThan(0);
  });

  it("scores strong passwords with high scores", () => {
    const res = checkPasswordStrength("C0mpl3x#P@ssw0rd!2026", { includeSuggestions: false });
    expect(["Strong", "Very Strong"]).toContain(res.strength);
    expect(res.score).toBeGreaterThanOrEqual(65);
    expect(res.analysis.hasUppercase).toBe(true);
    expect(res.analysis.hasLowercase).toBe(true);
    expect(res.analysis.hasNumbers).toBe(true);
    expect(res.analysis.hasSymbols).toBe(true);
  });

  it("detects repeated characters and penalizes score", () => {
    const resWithoutRepeat = checkPasswordStrength("Abcd1234!#");
    const resWithRepeat = checkPasswordStrength("Aaaaa1234!#");
    expect(resWithRepeat.analysis.repeatedCharacters).toBe(true);
  });

  it("detects sequential characters and penalizes score", () => {
    const res = checkPasswordStrength("Pass1234!@#");
    expect(res.analysis.sequentialCharacters).toBe(true);
  });
});
