import { HttpStatus } from "../../constants/http";
import { ApiError } from "../../utils/api-error";
import { usersRepository } from "./user.repository";
import { toSafeUser } from "./user.serializer";
import type { SafeUser } from "./user.types";
import type { updateProfileSchema } from "./user.validation";
import type { z } from "zod";

export const usersService = {
  async getPublicProfile(username: string) {
    const user = await usersRepository.findByUsername(username);

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Writer profile not found");
    }

    return toSafeUser(user);
  },

  async updateProfile(user: SafeUser, data: z.infer<typeof updateProfileSchema>) {
    const updated = await usersRepository.updateById(user.id, {
      $set: data,
    });

    if (!updated) {
      throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }

    return toSafeUser(updated);
  },
};
