// Mongoose schema and model for local user profiles.
// Auth/credentials are owned entirely by Clerk — this collection just
// mirrors a small amount of profile data (keyed by Clerk's user id) so
// the rest of the app has something local to query/extend later without
// re-fetching from Clerk on every request.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk's stable user id (the JWT `sub` claim).
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
