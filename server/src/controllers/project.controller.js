import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import {
    createProjectService,
    getAllProjectsService,
    getProjectByIdService,
    deleteProjectService,
    updateProjectService,
    getMyProjectsService,
    toggleLikeService,
    toggleSaveService
} from "../service/project.service.js";


// Create project
export const createProject = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        thumbnail,
        techStack,
        githubLink,
        liveLink
    } = req.body;

    const project = await createProjectService({
        title,
        description,
        thumbnail: req.file?.path || "",
        techStack:techStack?.split(",") || [],
        githubLink,
        liveLink,
        userId: req.user._id
    });


    return res
        .status(201)
        .json(new ApiResponse(201, project, "Project created"));

});


// Get all projects
export const getAllProjects = asyncHandler(async (req, res) => {

    const projects = await getAllProjectsService();

    return res.json(new ApiResponse(200, projects));

});


// Get project by id
export const getProjectById = asyncHandler(async (req, res) => {

    const project = await getProjectByIdService(req.params.id);

    return res.json(new ApiResponse(200, project));

});


// Delete project
export const deleteProject = asyncHandler(async (req, res) => {

    await deleteProjectService(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, {}, "Deleted"));

});


// Update project
export const updateProject = asyncHandler(async (req, res) => {

    const updated = await updateProjectService(req.params.id, req.user._id, req.body);

    return res.json(new ApiResponse(200, updated, "Updated"));

});


// My project
export const myProjects = asyncHandler(async (req, res) => {

    const projects = await getMyProjectsService(req.user._id);

    return res.json(new ApiResponse(200, projects));

});


// Toggle like
export const toggleLike = asyncHandler(async (req, res) => {

    const result = await toggleLikeService(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, {}, result));

});


// Toggle save
export const toggleSave = asyncHandler(async (req, res) => {

    const result = await toggleSaveService(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, {}, result));

});