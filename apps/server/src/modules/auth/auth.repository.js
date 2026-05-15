import mongoose from "mongoose";
import { AuthSession } from "./auth-session.model.js";
export const authRepository = {
  createSession(data) {
    return AuthSession.create({
      ...data,
      userId: new mongoose.Types.ObjectId(data.userId),
    });
  },
  findSessionById(id) {
    return AuthSession.findById(id);
  },
  revokeSession(id) {
    return AuthSession.findByIdAndUpdate(id, { $set: { revokedAt: new Date() } }, { new: true });
  },
  rotateSession(id, data) {
    return AuthSession.findByIdAndUpdate(id, { $set: data }, { new: true });
  },
};
