import mongoose from "mongoose";
import { AuthSession } from "./auth-session.model";

export const authRepository = {
  createSession(data: {
    userId: string;
    tokenId: string;
    refreshTokenHash: string;
    userAgent: string;
    ipAddress: string;
    expiresAt: Date;
  }) {
    return AuthSession.create({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
    });
  },

  findSessionById(id: string) {
    return AuthSession.findById(id);
  },

  revokeSession(id: string) {
    return AuthSession.findByIdAndUpdate(id, { $set: { revokedAt: new Date() } }, { new: true });
  },

  rotateSession(id: string, data: { tokenId: string; refreshTokenHash: string; expiresAt: Date }) {
    return AuthSession.findByIdAndUpdate(id, { $set: data }, { new: true });
  },
};
