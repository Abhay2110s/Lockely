import express from "express";
import * as authController from "../controllers/auth.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/verify-email-otp", authController.verifyEmailOTP);

router.post("/login", authController.login);

router.post("/verify-login-otp", authController.verifyLoginOTP);

router.post("/logout", verifyToken, authController.logout);

router.get("/profile", verifyToken, authController.profile);

export default router;