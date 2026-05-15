import { api } from "@/services/api";

export async function getCurrentUser() {
  const response = await api.get("/api/auth/me");
  return response.data.data;
}

export async function updateProfile(payload) {
  const response = await api.patch("/api/users/me/profile", payload);
  return response.data.data;
}
