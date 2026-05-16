import api from "../../../shared/services/api";

export const getAllBlogs = () => api.get("/blog/all");

export const getBlogBySlug = (slug) => api.get(`/blog/${slug}`);

export const getMyBlogs = () => api.get("/blog/my-blogs");

export const createBlog = (data) => api.post("/blog/create", data, {
    headers: { "Content-Type": "multipart/form-data" }
});

export const updateBlog = (id, data) => api.put(`/blog/update/${id}`, data);

export const deleteBlog = (id) => api.delete(`/blog/delete/${id}`);

export const toggleBlogLike = (id) => api.post(`/blog/like/${id}`);
