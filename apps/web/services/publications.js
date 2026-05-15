import { api } from "@/services/api";

export async function getMyPublications() {
  const response = await api.get("/api/publications/mine");
  return response.data.data;
}
