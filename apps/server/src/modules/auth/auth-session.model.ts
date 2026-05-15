import mongoose, { Schema, type HydratedDocument } from "mongoose";

export type AuthSessionShape = {
  userId: mongoose.Types.ObjectId;
  tokenId: string;
  refreshTokenHash: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  revokedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthSessionDocument = HydratedDocument<AuthSessionShape>;

const authSessionSchema = new Schema<AuthSessionShape>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    refreshTokenHash: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revokedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

authSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const AuthSession = mongoose.model<AuthSessionShape>("AuthSession", authSessionSchema);
