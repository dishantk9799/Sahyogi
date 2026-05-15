import { HttpStatus } from "../../constants/http.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { usersService } from "./user.service.js";
export const usersController = {
  getProfile: asyncHandler(async (req, res) => {
    const user = await usersService.getPublicProfile(req.params.username);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, user, "Writer profile"));
  }),
  updateMe: asyncHandler(async (req, res) => {
    const user = await usersService.updateProfile(req.user, req.body);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, user, "Profile updated"));
  }),
};
