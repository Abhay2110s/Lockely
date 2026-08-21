import { describe, it, expect } from "vitest";
import { calculateEntropy } from "../src/utils/entropy.js";

describe("Entropy Calculator", () => {
  it("should return 0 for empty password", () => {
    expect(calculateEntropy("")).toBe(0);
  });

  it("should calculate entropy for lowercase-only password", () => {
    // 8 chars * log2(26) ≈ 8 * 4.7004 = 37.60
    const entropy = calculateEntropy("abcdefgh");
    expect(entropy).toBeGreaterThan(30);
    expect(entropy).toBeLessThan(40);
  });

  it("should calculate higher entropy when character sets increase", () => {
    const entropyLower = calculateEntropy("abcdefgh");
    const entropyMixed = calculateEntropy("Abcdef12");
    const entropyComplex = calculateEntropy("Ab1!Cd2@");

    expect(entropyMixed).toBeGreaterThan(entropyLower);
    expect(entropyComplex).toBeGreaterThan(entropyMixed);
  });
});
