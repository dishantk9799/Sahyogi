import bcrypt from "bcryptjs";
import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import type { UserDocumentShape, UserRole } from "./user.types";

export type UserDocument = HydratedDocument<UserDocumentShape>;

type UserModel = Model<UserDocumentShape> & {
  hashPassword(password: string): Promise<string>;
};

const socialSchema = new Schema(
  {
    website: { type: String, trim: true },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
  },
  { _id: false },
);

const userSchema = new Schema<UserDocumentShape, UserModel>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 32,
      match: /^[a-z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["reader", "writer", "admin"] satisfies UserRole[],
      default: "writer",
    },
    bio: {
      type: String,
      default: "",
      maxlength: 280,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    bannerUrl: {
      type: String,
      default: "",
    },
    socials: {
      type: socialSchema,
      default: {},
    },
    emailVerifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.hashPassword = async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
};

export const User = mongoose.model<UserDocumentShape, UserModel>("User", userSchema);
