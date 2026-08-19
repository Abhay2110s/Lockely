// Mongoose schema and model for vault folders — user-defined groupings
// used to organize password entries. A folder's `name` maps onto the
// existing `category` string field on Password entries, so folders
// require no changes to the vault schema or its query patterns.
import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    // The owner's user id (MongoDB ObjectId string from the User model).
    user: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Folder name is required"],
      trim: true,
      maxlength: 60,
    },

    icon: { type: String, trim: true, default: "" },
    color: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
);

// A user can't have two folders with the same name (case-insensitive
// would require a collation; plain uniqueness is sufficient here since
// the client always sends a trimmed display name).
folderSchema.index({ user: 1, name: 1 }, { unique: true });

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;
