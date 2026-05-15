import mongoose, { Schema, type HydratedDocument } from "mongoose";
import type { PublicationStatus } from "./publication.types";

export type PublicationShape = {
  ownerId: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  tagline: string;
  logoUrl: string;
  coverUrl: string;
  accentColor: string;
  status: PublicationStatus;
  subscriberCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicationDocument = HydratedDocument<PublicationShape>;

const publicationSchema = new Schema<PublicationShape>(
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
      enum: ["draft", "active", "paused"] satisfies PublicationStatus[],
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

export const Publication = mongoose.model<PublicationShape>("Publication", publicationSchema);
