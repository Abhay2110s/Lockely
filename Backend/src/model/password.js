import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    website: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    encryptedPassword: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
      maxlength: 500,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

const Password = mongoose.model("Password", passwordSchema);

export default Password;