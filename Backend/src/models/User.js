// Mongoose schema and model for application users.
// Stores credentials, verification status, and password-reset tokens.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Whether the user has completed email verification.
    isVerified: {
      type: Boolean,
      default: false,
    },

    // SHA-256 hash of a one-time reset token; never stored in plaintext.
    resetPasswordTokenHash: {
      type: String,
      default: null,
      select: false,
    },

    // Expiry timestamp for the reset token.
    resetPasswordExpires: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;