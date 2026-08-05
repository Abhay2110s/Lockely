import express from "express";
import { checkPassword } from "../controllers/password.controller.js";
import { generatePassword } from "../controllers/password.controller.js"

const router = express.Router();

// Check password strength
router.post("/check", checkPassword);
router.post("/generate", generatePassword);

export default router;