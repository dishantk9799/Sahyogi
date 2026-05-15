import Project from "../models/project.model.js";
import ProjectLike from "../models/projectLike.model.js";
import SavedProject from "../models/savedProject.model.js";
import ApiError from "../utils/apiError.js";

// Create project service
export const createProjectService = async (data) => {

    const project = await Project.create(data);
    return project;

};


// Get all project service
export const getAllProjectsService = async () => {

    return await Project
        .find()
        .populate(
            "userId",
            "name username profileImage"
        )
        .sort({
            createdAt: -1
        });

};


// Get project by id service
export const getProjectByIdService = async (id) => {

    const project = await Project
        .findById(id)
        .populate(
            "userId",
            "name username profileImage"
        );


    if (!project) throw new ApiError(404, "Project not found");

    return project;

};


// Delete project service
export const deleteProjectService = async (projectId, userId) => {

    const project = await Project.findById(projectId);

    if (!project) throw new ApiError(404, "Project not found");


    if (project.userId.toString() !== userId.toString()) throw new ApiError(403, "Unauthorized");

    await Project.findByIdAndDelete(projectId);

    return true;

};


// Update project service
export const updateProjectService = async (projectId, userId, data) => {

    const project = await Project.findById(projectId);

    if (!project) throw new ApiError(404, "Project not found");

    if (project.userId.toString() !== userId.toString()) throw new ApiError(403, "Unauthorized");

    return await Project
        .findByIdAndUpdate(
            projectId,
            data,
            {
                new: true
            }
        );
};


// Get my project service
export const getMyProjectsService = async (userId) => {

    return await Project
        .find({ userId })
        .sort({ createdAt: -1 });

};

// Toggle like service
export const toggleLikeService = async (projectId, userId) => {

    const existingLike = await ProjectLike.findOne({ projectId, userId });

    if (existingLike) {
        await ProjectLike.deleteOne({ _id: existingLike._id });
        return "Unliked";
    }

    await ProjectLike.create({ projectId, userId });

    return "Liked";

};

// Toggle save service
export const toggleSaveService = async (projectId, userId) => {

    const existing = await SavedProject.findOne({ projectId, userId });

    if (existing) {
        await SavedProject.deleteOne({ _id: existing._id });
        return "Unsaved";
    }

    await SavedProject.create({ projectId, userId });

    return "Saved";

};