import api from "../../../shared/services/api";

export const getProfile = (username) => api.get(`/user/profile/${username}`);

export const updateProfile = (data) => api.put("/user/update-profile", data, {
    headers: { "Content-Type": "multipart/form-data" }
});

export const toggleFollow = (id) => api.post(`/user/follow/${id}`);

export const getSavedProjects = () => api.get("/user/saved-projects");
