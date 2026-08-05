// Password controller — provides endpoints for checking password
// strength and generating random passwords.
import { checkPasswordStrength } from "../utils/passwordChecker.js";
import { generatePasswords } from "../utils/passwordGenerator.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Evaluate the strength of a given password and return a score,
// entropy, estimated crack time, and actionable feedback.
export const checkPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw ApiError.badRequest("Password is required.");
  }

  const result = checkPasswordStrength(password);
  return new ApiResponse(200, "Password strength calculated.", result).send(res);
});

// Generate one or more strong random passwords based on the
// requested length, count, and character-type options.
export const generatePassword = asyncHandler(async (req, res) => {
  const {
    length = 16,
    count = 5,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
  } = req.body;

  if (length < 8 || length > 64) {
    throw ApiError.badRequest("Password length must be between 8 and 64.");
  }

  if (count < 1 || count > 20) {
    throw ApiError.badRequest("Count must be between 1 and 20.");
  }

  const passwords = generatePasswords({
    length,
    count,
    uppercase,
    lowercase,
    numbers,
    symbols,
    excludeSimilar,
  });

  return new ApiResponse(200, "Passwords generated.", passwords).send(res);
});
