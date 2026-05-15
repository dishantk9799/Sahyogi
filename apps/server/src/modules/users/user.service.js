import { HttpStatus } from "../../constants/http.js";
import { ApiError } from "../../utils/api-error.js";
import { usersRepository } from "./user.repository.js";
import { toSafeUser } from "./user.serializer.js";
export const usersService = {
  async getPublicProfile(username) {
    const user = await usersRepository.findByUsername(username);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Writer profile not found");
    }
    return toSafeUser(user);
  },
  async updateProfile(user, data) {
    const updated = await usersRepository.updateById(user.id, {
      $set: data,
    });
    if (!updated) {
      throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }
    return toSafeUser(updated);
  },
};
