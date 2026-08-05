// Password strength checker — evaluates a password's resilience
// by scoring length, character diversity, repeated/sequential
// patterns, entropy, and estimated crack time.
import { calculateEntropy } from "./entropy.js";
import { estimateCrackTime } from "./crackTime.js";
import { getPasswordSuggestions } from "./passwordSuggestion.js";

export const checkPasswordStrength = (password, { includeSuggestions = true } = {}) => {
  let score = 0;
  const feedback = [];

  // Stores detailed analysis results for the frontend to display.
  const analysis = {
    length: password.length,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSymbols: false,
    repeatedCharacters: false,
    sequentialCharacters: false,
  };

  // ===========================
  // Length Score
  // ===========================

  if (password.length >= 16) {
    score += 30;
  } else if (password.length >= 12) {
    score += 20;
  } else if (password.length >= 8) {
    score += 10;
  } else {
    feedback.push("Password should contain at least 8 characters.");
  }

  // ===========================
  // Uppercase
  // ===========================

  if (/[A-Z]/.test(password)) {
    analysis.hasUppercase = true;
    score += 15;
  } else {
    feedback.push("Add at least one uppercase letter.");
  }

  // ===========================
  // Lowercase
  // ===========================

  if (/[a-z]/.test(password)) {
    analysis.hasLowercase = true;
    score += 15;
  } else {
    feedback.push("Add at least one lowercase letter.");
  }

  // ===========================
  // Numbers
  // ===========================

  if (/\d/.test(password)) {
    analysis.hasNumbers = true;
    score += 15;
  } else {
    feedback.push("Add at least one number.");
  }

  // ===========================
  // Symbols
  // ===========================

  if (/[^a-zA-Z0-9]/.test(password)) {
    analysis.hasSymbols = true;
    score += 15;
  } else {
    feedback.push("Add at least one special character.");
  }

  // ===========================
  // Detect repeated characters
  // Example:
  // aaaa
  // 1111
  // $$$$
  // ===========================

  if (/(.)\1{2,}/.test(password)) {
    analysis.repeatedCharacters = true;
    score -= 10;
    feedback.push("Avoid repeated characters.");
  }

  // ===========================
  // Detect sequential characters
  // Example:
  // 1234
  // abcd
  // ABCD
  // ===========================

  const lower = password.toLowerCase();

  const sequences = [
    "0123456789",
    "abcdefghijklmnopqrstuvwxyz",
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm"
  ];

  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 3; i++) {

      const part = seq.substring(i, i + 4);

      if (lower.includes(part)) {
        analysis.sequentialCharacters = true;
        score -= 10;
        feedback.push("Avoid sequential characters.");
        break;
      }

    }
  }

  // Clamp score to the 0-100 range.
  score = Math.max(score, 0);
  score = Math.min(score, 100);

  // ===========================
  // Entropy
  // ===========================

  const entropy = calculateEntropy(password);

  // ===========================
  // Crack Time
  // ===========================

  const crackTime = estimateCrackTime(entropy);

  // ===========================
  // Overall Strength
  // ===========================

  let strength = "";

  if (score < 25) {
    strength = "Very Weak";
  } else if (score < 45) {
    strength = "Weak";
  } else if (score < 65) {
    strength = "Medium";
  } else if (score < 85) {
    strength = "Strong";
  } else {
    strength = "Very Strong";
  }

  return {
    score,
    strength,
    entropy,
    crackTime,
    analysis,
    feedback,

    // Suggest stronger passwords only if the current password is weak.
    // `includeSuggestions` breaks the checkPasswordStrength -> getPasswordSuggestions
    // -> generatePasswords -> checkPasswordStrength recursion: the generator
    // calls this function internally to score candidates and must not ask
    // for suggestions of its own suggestions.
    suggestions:
      includeSuggestions && score < 80
        ? getPasswordSuggestions()
        : [],
  };
};