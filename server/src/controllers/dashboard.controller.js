import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import { dashboardService } from "../service/dashboard.service.js";


// Dashboard
export const dashboard = asyncHandler(async (req, res) => {

    const data = await dashboardService(req.user._id);

    return res.json(new ApiResponse(200, data));

});