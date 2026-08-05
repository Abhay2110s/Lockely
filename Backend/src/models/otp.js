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