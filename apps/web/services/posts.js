import { api } from "@/services/api";

export async function getMyPosts() {
  const response = await api.get("/api/posts/mine");
  return response.data.data;
}
