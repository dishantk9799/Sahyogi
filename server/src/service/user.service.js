import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import SavedProject from "../models/savedProject.model.js";
import ApiError from "../utils/apiError.js";

// Get profile service
export const getProfileService = async (username) => {

    const user = await User.findOne({ username }).select("-password");

    if (!user) throw new ApiError(404, "User not found");

    return user;

};


// Update profile service
export const updateProfileService = async (userId, data) => {

    return await User.findByIdAndUpdate(userId, data, { new: true }).select("-password");

};


// Toggle follow service
export const toggleFollowService = async (currentUserId, targetUserId) => {

    if (currentUserId.toString() === targetUserId.toString()) throw new ApiError(400, "Cannot follow yourself");

    const existing = await Follow.findOne({
        followerId: currentUserId,
        followingId: targetUserId
    });


    if (existing) {
        await Follow.deleteOne({ _id: existing._id });
        return "Unfollowed";
    }

    await Follow.create({
        followerId: currentUserId,
        followingId: targetUserId
    });

    return "Followed";

};


// Get saved project service
export const getSavedProjectsService = async (userId) => {

    return await SavedProject
        .find({ userId })
        .populate({
            path: "projectId",
            populate: {
                path: "userId",
                select: "name username profileImage"
            }
        });

};