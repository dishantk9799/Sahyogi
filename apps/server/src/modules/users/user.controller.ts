import { HttpStatus } from "../../constants/http";
import { asyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { usersService } from "./user.service";

export const usersController = {
  getProfile: asyncHandler(async (req, res) => {
    const user = await usersService.getPublicProfile(req.params.username!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, user, "Writer profile"));
  }),

  updateMe: asyncHandler(async (req, res) => {
    const user = await usersService.updateProfile(req.user!, req.body);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, user, "Profile updated"));
  }),
};
