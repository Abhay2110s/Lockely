// User model — stores account credentials and profile data.
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
