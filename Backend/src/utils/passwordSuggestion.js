// Password suggestion generator — produces a curated list of
// "Very Strong" passwords for the user to choose from.
import { generatePasswords } from "./passwordGenerator.js";

/**
 * Generate strong password suggestions.
 * Returns only passwords that are classified as "Very Strong".
 */
export const getPasswordSuggestions = () => {
  // Generate more passwords so we have enough strong options to filter.
  const generated = generatePasswords({
    length: 16,
    count: 10,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: true,
  });

  // Keep only very strong passwords and limit to the top 3.
  const suggestions = generated
    .filter((item) => item.strength === "Very Strong")
    .slice(0, 3);

  return suggestions;
};