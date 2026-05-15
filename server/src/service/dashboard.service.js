import Project from "../models/project.model.js";
import Blog from "../models/blog.model.js";
import Follow from "../models/follow.model.js";

// Dashboard service
export const dashboardService = async (userId) => {

    const projects = await Project.countDocuments({ userId });

    const blogs = await Blog.countDocuments({ authorId: userId });

    const followers = await Follow.countDocuments({ followingId: userId });

    const following = await Follow.countDocuments({ followerId: userId });

    return {
        projects,
        blogs,
        followers,
        following
    };

};