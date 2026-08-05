// Mongoose schema and model for one-time passwords (OTPs)
// used in email verification, login, and password-reset flows.
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    // Categorises the OTP so the same table can serve multiple flows.
    type: {
      type: String,
      enum: [
        "EMAIL_VERIFICATION",
        "LOGIN",
        "FORGOT_PASSWORD",
      ],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// Speeds up the lookup used on every OTP verification (email + type).
otpSchema.index({ email: 1, type: 1 });

// TTL index — MongoDB automatically deletes the document once expiresAt
// is in the past, so stale/used OTPs never accumulate in the collection.
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("OTP", otpSchema);