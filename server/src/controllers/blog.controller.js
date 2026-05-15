import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import {
    createBlogService,
    getAllBlogsService,
    getBlogBySlugService,
    updateBlogService,
    deleteBlogService,
    toggleBlogLikeService,
    myBlogsService
} from "../service/blog.service.js";


// Create blog
export const createBlog = asyncHandler(async (req, res) => {
    const {
        title,
        slug,
        content,
        tags
    } = req.body;

    const blog = await createBlogService({
        title,
        slug,
        coverImage: req.file?.path || "",
        content,
        tags: tags?.split(",") || [],
        authorId: req.user._id

    });

    return res
        .status(201)
        .json(new ApiResponse(201, blog, "Blog created"));

});


// Get all blogs
export const getAllBlogs = asyncHandler(async (req, res) => {

    const blogs = await getAllBlogsService();

    return res.json(new ApiResponse(200, blogs));

});


// Get blog by slug
export const getBlogBySlug = asyncHandler(async (req, res) => {

    const blog = await getBlogBySlugService(req.params.slug);

    return res.json(new ApiResponse(200, blog));

});


// Update blog
export const updateBlog = asyncHandler(async (req, res) => {

    const updated = await updateBlogService(req.params.id, req.user._id, req.body);

    return res.json(new ApiResponse(200, updated, "Updated"));

});


// Delete blog
export const deleteBlog = asyncHandler(async (req, res) => {

    await deleteBlogService(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, {}, "Deleted"));

});


// Toggle blog like
export const toggleBlogLike = asyncHandler(async (req, res) => {

    const result = await toggleBlogLikeService(req.params.id, req.user._id);

    return res.json(new ApiResponse(200, {}, result));

});


// My blogs
export const myBlogs = asyncHandler(async (req, res) => {

    const blogs = await myBlogsService(req.user._id);

    return res.json(new ApiResponse(200, blogs));

});