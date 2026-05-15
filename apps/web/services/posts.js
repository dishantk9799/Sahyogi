import { api } from "@/services/api";

export async function getMyPosts() {
  const response = await api.get("/api/posts/mine");
  return response.data.data;
}

export async function createPost(payload) {
  const response = await api.post("/api/posts", payload);
  return response.data.data;
}

export async function updatePost(postId, payload) {
  const response = await api.patch(`/api/posts/${postId}`, payload);
  return response.data.data;
}

export async function publishPost(postId) {
  const response = await api.post(`/api/posts/${postId}/publish`);
  return response.data.data;
}
