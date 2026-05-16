import api from "../../../shared/services/api";

export const getDashboard = () => api.get("/dashboard");
