import api from "../../../shared/services/api";

export const getAllProjects = () => api.get("/project/all");

export const getProjectById = (id) => api.get(`/project/${id}`);

export const getMyProjects = () => api.get("/project/my-projects");

export const createProject = (data) => api.post("/project/create", data, {
    headers: { "Content-Type": "multipart/form-data" }
});

export const updateProject = (id, data) => api.put(`/project/update/${id}`, data);

export const deleteProject = (id) => api.delete(`/project/delete/${id}`);

export const toggleProjectLike = (id) => api.post(`/project/like/${id}`);

export const toggleProjectSave = (id) => api.post(`/project/save/${id}`);
