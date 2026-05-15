import { HttpStatus } from "../../constants/http.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { dashboardService } from "./dashboard.service.js";
export const dashboardController = {
  overview: asyncHandler(async (req, res) => {
    const overview = await dashboardService.overview(req.user);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, overview, "Dashboard overview"));
  }),
};
