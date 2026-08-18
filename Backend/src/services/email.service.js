// Email service — sends OTP and password-reset emails via Nodemailer.
// Configure SMTP credentials in .env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).
import nodemailer from "nodemailer";
import env from "../config/env.js";
import logger from "../utils/logger.js";

// Create a reusable transporter. Falls back to Ethereal (a fake SMTP
// service for development) if no real SMTP credentials are provided.
let transporter;

function getTransporter() {
  if (transporter) return transporter;

  if (env.SMTP_USER && env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  } else {
    // Development fallback — logs email content to console instead of
    // sending it, so the app works without any SMTP configuration.
    transporter = {
      sendMail: async (opts) => {
        logger.info(`[DEV EMAIL] To: ${opts.to}\nSubject: ${opts.subject}\n${opts.text || opts.html}`);
        return { messageId: "dev-mode" };
      },
    };
    logger.warn("SMTP not configured — emails will be printed to the console (dev mode).");
  }

  return transporter;
}

/**
 * Send a 6-digit OTP for email verification or password reset.
 * @param {string} to       - Recipient email address
 * @param {string} otp      - 6-digit OTP string
 * @param {"verify"|"reset"} type
 */
export const sendOTPEmail = async (to, otp, type = "verify") => {
  const isReset = type === "reset";

  const subject = isReset
    ? "PassGuardian — Password Reset Code"
    : "PassGuardian — Verify Your Email";

  const heading = isReset ? "Reset your password" : "Verify your email";
  const body = isReset
    ? "Use the code below to reset your master password. It expires in 10 minutes."
    : "Use the code below to verify your email address. It expires in 10 minutes.";

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#faf8f5;border-radius:16px;">
      <div style="background:#4f46e5;width:48px;height:48px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
        <span style="color:#fff;font-size:24px;">🔐</span>
      </div>
      <h2 style="text-align:center;color:#0f172a;font-size:22px;margin:0 0 8px;">${heading}</h2>
      <p style="text-align:center;color:#64748b;font-size:13px;margin:0 0 28px;">${body}</p>
      <div style="background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:24px;text-align:center;margin-bottom:24px;">
        <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#4f46e5;font-family:monospace;">${otp}</span>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:11px;">If you didn't request this, you can safely ignore this email.</p>
      <p style="text-align:center;color:#94a3b8;font-size:11px;">— The PassGuardian Team</p>
    </div>
  `;

  await getTransporter().sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text: `Your PassGuardian code: ${otp}  (expires in 10 minutes)`,
    html,
  });

  logger.info(`OTP email [${type}] sent to ${to}`);
};
