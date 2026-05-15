import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import {
    getProfileService,
    updateProfileService,
    toggleFollowService,
    getSavedProjectsService
} from "../service/user.service.js";


// Get profile
export const getProfile = asyncHandler(async (req, res) => {

    const user = await getProfileService(req.params.username);

    return res.json(new ApiResponse(200, user));

});


// Update profile
export const updateProfile = asyncHandler(async (req, res) => {

    const data = { ...req.body };

    if (req.files?.profileImage) data.profileImage = req.files.profileImage[0].path;

    if (req.files?.bannerImage) data.bannerImage = req.files.bannerImage[0].path;

    const updated = await updateProfileService(req.user._id, data);

    return res.json(new ApiResponse(200, updated, "Profile updated"));

});


// Toggle Follow
export const toggleFollow = asyncHandler(async (req, res) => {

    const result = await toggleFollowService(req.user._id, req.params.id);

    return res.json(new ApiResponse(200, {}, result));

});


// Saved project
export const savedProjects = asyncHandler(async (req, res) => {

    const data = await getSavedProjectsService(req.user._id);

    return res.json(new ApiResponse(200, data));

});