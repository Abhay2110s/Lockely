// User model — stores account credentials, profile data, 2FA state,
// and the vault key salt for client-side key derivation.
// Auth is handled in-house with bcrypt + JWT.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // never returned in queries by default
    },

    // Email must be verified via OTP before the account can be used.
    isVerified: {
      type: Boolean,
      default: false,
    },

    // ─── Vault Key Derivation (zero-knowledge encryption) ───────────────────
    //
    // The browser derives a per-user AES-256-GCM vault key from the user's
    // master password using PBKDF2: key = PBKDF2(masterPassword, vaultKeySalt).
    //
    // vaultKeySalt is a random 32-byte hex string generated at registration.
    // It is NOT secret — it's sent to the browser on login so key derivation
    // can happen. Without the master password, the salt is useless.
    //
    // The server NEVER sees the derived key or plaintext vault secrets.
    // It only stores and passes through ciphertext/iv/authTag blobs.
    vaultKeySalt: {
      type: String,
      default: null,
    },

    // ─── Profile Fields ──────────────────────────────────────────────────
    displayName: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    preferredLanguage: {
      type: String,
      default: "en",
    },

    securityPreferences: {
      autoLockMinutes: { type: Number, default: 15 },
      clipboardClearSeconds: { type: Number, default: 30 },
      enable2FA: { type: Boolean, default: false },
    },

    // ─── Two-Factor Authentication (TOTP) ──────────────────────────────────
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    // TOTP secret (base32). Stored encrypted-at-rest by MongoDB encryption if
    // configured; otherwise rely on DB access controls + httpOnly cookie auth.
    twoFactorSecret: {
      type: String,
      default: null,
      select: false, // never returned by default — only fetched explicitly
    },

    // Hashed backup codes (bcrypt). Each is single-use.
    twoFactorBackupCodes: {
      type: [String],
      default: [],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving if it was modified.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Instance method to compare a candidate password against the stored hash.
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
