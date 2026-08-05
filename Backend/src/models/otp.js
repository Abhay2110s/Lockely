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


export default mongoose.model("OTP", otpSchema);