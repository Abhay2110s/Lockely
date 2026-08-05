// Mongoose schema and model for vault password entries.
// Stores encrypted secrets, strength snapshots, reuse history,
// soft-delete state, and expiry tracking.
import mongoose from "mongoose";
import env from "../config/env.js";

// Embedded snapshot of a previous version of a vault entry's secret.
// Kept so we can prevent a user from reusing an old password.
const historyEntrySchema = new mongoose.Schema(
  {
    cipherText: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true },
    passwordHash: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const passwordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    website: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
    username: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },

    // --- Encrypted secret (AES-256-GCM) ---
    cipherText: { type: String, required: true },
    iv: { type: String, required: true },
    authTag: { type: String, required: true },

    // SHA-256 hash of the plaintext password, used only to detect reuse
    // across entries without ever decrypting anything.
    passwordHash: { type: String, required: true, index: true },

    // Strength snapshot computed at the time the secret was last set.
    strength: {
      score: { type: Number, default: 0 },
      label: { type: String, default: "Very Weak" },
      entropy: { type: Number, default: 0 },
    },

    // --- Secure notes ---
    notes: { type: String, default: "", maxlength: 1000 },
    recoveryEmail: { type: String, trim: true, lowercase: true, default: "" },

    backupCodes: {
      cipherText: { type: String, default: null },
      iv: { type: String, default: null },
      authTag: { type: String, default: null },
    },

    // --- Organisation ---
    category: { type: String, trim: true, default: "General" },
    favorite: { type: Boolean, default: false, index: true },

    // --- History ---
    history: { type: [historyEntrySchema], default: [] },

    // --- Expiry ---
    lastPasswordChangeAt: { type: Date, default: Date.now },
    expiryDays: { type: Number, default: () => env.PASSWORD_EXPIRY_DAYS },

    // --- Soft delete ---
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Exclude soft-deleted entries by default unless explicitly requested.
passwordSchema.query.notDeleted = function () {
  return this.where({ isDeleted: false });
};

// Virtual: the date at which the password expires.
passwordSchema.virtual("expiresAt").get(function () {
  const expiry = new Date(this.lastPasswordChangeAt);
  expiry.setDate(expiry.getDate() + this.expiryDays);
  return expiry;
});

// Virtual: whether the entry has passed its expiry date.
passwordSchema.virtual("isExpired").get(function () {
  return Date.now() > this.expiresAt.getTime();
});

// Virtual: number of days remaining until expiry.
passwordSchema.virtual("daysRemaining").get(function () {
  const diffMs = this.expiresAt.getTime() - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
});

passwordSchema.set("toJSON", { virtuals: true });
passwordSchema.set("toObject", { virtuals: true });

const Password = mongoose.model("Password", passwordSchema);

export default Password;
