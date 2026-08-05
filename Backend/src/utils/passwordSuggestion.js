import { generatePasswords } from "./passwordGenerator.js";

/**
 * Generate strong password suggestions.
 * Returns only passwords that are classified as "Very Strong".
 */
export const getPasswordSuggestions = () => {

  // Generate more passwords so we have enough strong options
  const generated = generatePasswords({
    length: 16,
    count: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });

  // Keep only very strong passwords
  const suggestions = generated
    .filter((item) => item.strength === "Very Strong")
    .slice(0, 3);

  return suggestions;
};