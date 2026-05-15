import Blog from "../models/blog.model.js";
import BlogLike from "../models/blogLike.model.js";
import ApiError from "../utils/apiError.js";


// Create blog service
export const createBlogService = async (data) => {

    return await Blog.create(data);

};


// Get all blogs service
export const getAllBlogsService = async () => {

    return await Blog
        .find()
        .populate("authorId", "name username profileImage")
        .sort({ createdAt: -1 });

};


// Get blog by service
export const getBlogBySlugService = async (slug) => {

    const blog = await Blog
        .findOne({ slug })
        .populate("authorId", "name username profileImage");

    if (!blog) throw new ApiError(404, "Blog not found");

    return blog;

};


// Update blog service
export const updateBlogService = async (blogId, userId, data) => {

    const blog = await Blog.findById(blogId);

    if (!blog) throw new ApiError(404, "Blog not found");

    if (blog.authorId.toString() !== userId.toString()) throw new ApiError(403, "Unauthorized");

    return await Blog.findByIdAndUpdate(blogId, data, { new: true });

};


// Delete blog service
export const deleteBlogService = async (blogId, userId) => {

    const blog = await Blog.findById(blogId);

    if (!blog) throw new ApiError(404, "Blog not found");

    if (blog.authorId.toString() !== userId.toString()) throw new ApiError(403, "Unauthorized");

    await Blog.findByIdAndDelete(blogId);

    return true;

};


// Toggle blog like service
export const toggleBlogLikeService = async (blogId, userId) => {

    const existing = await BlogLike.findOne({ blogId, userId });

    if (existing) {
        await BlogLike.deleteOne({ _id: existing._id });
        return "Unliked";
    }

    await BlogLike.create({ blogId, userId });

    return "Liked";

};


// My blogs service
export const myBlogsService = async (userId) => {

    return await Blog.find({ authorId: userId }).sort({ createdAt: -1 });

};