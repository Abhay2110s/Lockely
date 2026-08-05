import { checkPasswordStrength } from "../utils/passwordChecker.js";
import { generatePasswords } from "../utils/passwordGenerator.js";

export const checkPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const result = checkPasswordStrength(password);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generatePassword = async (req, res) => {
  try {
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
      return res.status(400).json({
        success: false,
        message: "Password length must be between 8 and 64.",
      });
    }

    if (count < 1 || count > 20) {
      return res.status(400).json({
        success: false,
        message: "Count must be between 1 and 20.",
      });
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

    return res.status(200).json({
      success: true,
      passwords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};