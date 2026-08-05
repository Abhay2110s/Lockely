// Password generation — produces cryptographically strong random
// passwords using Node's built-in crypto module.
import crypto from "crypto";
import { checkPasswordStrength } from "./passwordChecker.js";

export const generatePasswords = ({
  length = 16,
  count = 5,
  uppercase = true,
  lowercase = true,
  numbers = true,
  symbols = true,
  excludeSimilar = false,
}) => {
  // Character pools for each category.
  const LOWER = "abcdefghijklmnopqrstuvwxyz";
  const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const NUMBER = "0123456789";
  const SYMBOL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  // Characters that look similar and can cause user confusion.
  const SIMILAR = "O0Il1";

  let lowerChars = LOWER;
  let upperChars = UPPER;
  let numberChars = NUMBER;
  let symbolChars = SYMBOL;

  // Remove visually similar characters when requested.
  if (excludeSimilar) {
    const remove = (str) =>
      [...str].filter((c) => !SIMILAR.includes(c)).join("");

    lowerChars = remove(lowerChars);
    upperChars = remove(upperChars);
    numberChars = remove(numberChars);
  }

  // Build the pool of selected character types.
  const pools = [];

  if (lowercase) pools.push(lowerChars);
  if (uppercase) pools.push(upperChars);
  if (numbers) pools.push(numberChars);
  if (symbols) pools.push(symbolChars);

  // At least one character type must be selected.
  if (pools.length === 0) {
    throw new Error("At least one character type must be selected.");
  }

  // Password length must accommodate at least one char from each pool.
  if (length < pools.length) {
    throw new Error(
      `Password length must be at least ${pools.length} for the selected character types.`
    );
  }

  const allCharacters = pools.join("");

  // Pick a random character from the given string.
  const randomChar = (str) => {
    return str[crypto.randomInt(0, str.length)];
  };

  // Fisher-Yates shuffle using cryptographically random indices.
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0, i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const passwords = [];
  const generated = new Set();

  for (let i = 0; i < count; i++) {
    let password = [];

    // Ensure one character from each selected pool.
    for (const pool of pools) {
      password.push(randomChar(pool));
    }

    // Fill the remaining length with random characters from all pools.
    while (password.length < length) {
      password.push(randomChar(allCharacters));
    }

    password = shuffle(password).join("");

    // `includeSuggestions: false` avoids re-entering getPasswordSuggestions()
    // for every candidate we generate here (see passwordChecker.js).
    const analysis = checkPasswordStrength(password, {
      includeSuggestions: false,
    });

    if (!generated.has(password)) {
      generated.add(password);

      passwords.push({
        password,
        score: analysis.score,
        strength: analysis.strength,
        feedback: analysis.feedback,
      });
    } else {
      i--;
    }
  }

  return passwords;
};