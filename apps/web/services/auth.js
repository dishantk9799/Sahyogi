import { api } from "@/services/api";

export async function signup(payload) {
  const response = await api.post("/api/auth/signup", payload);
  return response.data.data;
}

export async function login(payload) {
  const response = await api.post("/api/auth/login", payload);
  return response.data.data;
}

export async function refreshSession() {
  const response = await api.post("/api/auth/refresh");
  return response.data.data;
}

export async function logout() {
  const response = await api.post("/api/auth/logout");
  return response.data.data;
}
