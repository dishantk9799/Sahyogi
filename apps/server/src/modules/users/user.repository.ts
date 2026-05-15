import type { UpdateQuery } from "mongoose";
import { User, type UserDocument } from "./user.model";
import type { UserDocumentShape } from "./user.types";

export const usersRepository = {
  create(data: Pick<UserDocumentShape, "fullName" | "username" | "email" | "passwordHash">) {
    return User.create(data);
  },

  findById(id: string) {
    return User.findById(id);
  },

  findByUsername(username: string) {
    return User.findOne({ username: username.toLowerCase() });
  },

  findByEmail(email: string, includePassword = false) {
    const query = User.findOne({ email: email.toLowerCase() });
    return includePassword ? query.select("+passwordHash") : query;
  },

  findByEmailOrUsername(email: string, username: string) {
    return User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    });
  },

  updateById(id: string, data: UpdateQuery<UserDocument>) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },
};
