import { HttpStatus } from "../../constants/http";
import { asyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { dashboardService } from "./dashboard.service";

export const dashboardController = {
  overview: asyncHandler(async (req, res) => {
    const overview = await dashboardService.overview(req.user!);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, overview, "Dashboard overview"));
  }),
};
