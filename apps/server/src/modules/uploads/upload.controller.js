import { HttpStatus } from "../../constants/http.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { uploadsService } from "./upload.service.js";

export const uploadsController = {
  uploadImage: asyncHandler(async (req, res) => {
    const image = await uploadsService.uploadImage(req.file);
    res
      .status(HttpStatus.CREATED)
      .json(new ApiResponse(HttpStatus.CREATED, image, "Image uploaded"));
  }),
};
