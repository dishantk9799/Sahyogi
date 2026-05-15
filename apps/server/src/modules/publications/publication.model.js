import mongoose, { Schema } from "mongoose";
const publicationSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 80,
    },
    description: {
      type: String,
      default: "",
      maxlength: 800,
    },
    tagline: {
      type: String,
      default: "",
      maxlength: 140,
    },
    logoUrl: {
      type: String,
      default: "",
    },
    coverUrl: {
      type: String,
      default: "",
    },
    accentColor: {
      type: String,
      default: "#111827",
    },
    status: {
      type: String,
      enum: ["draft", "active", "paused"],
      default: "active",
    },
    subscriberCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);
publicationSchema.index({ ownerId: 1, createdAt: -1 });
export const Publication = mongoose.model("Publication", publicationSchema);
