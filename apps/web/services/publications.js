import { api } from "@/services/api";

export async function getMyPublications() {
  const response = await api.get("/api/publications/mine");
  return response.data.data;
}

export async function getPublicationSubscribers(publicationId, params = {}) {
  const response = await api.get(`/api/publications/${publicationId}/subscribers`, { params });
  return response.data.data;
}
