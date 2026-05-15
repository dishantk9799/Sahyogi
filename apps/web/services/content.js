import { seedPosts, seedPublications } from "@/services/seed-data";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function apiFetch(path) {
  if (!apiUrl) {
    return null;
  }
  try {
    const response = await fetch(`${apiUrl}${path}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      return null;
    }
    const envelope = await response.json();
    return envelope.data;
  } catch {
    return null;
  }
}
export async function getFeaturedPosts() {
  const posts = await apiFetch("/api/posts");
  return posts?.length ? posts : seedPosts;
}
export async function getPost(slug) {
  const post = await apiFetch(`/api/posts/${slug}`);
  return post ?? seedPosts.find((item) => item.slug === slug) ?? seedPosts[0];
}
export async function getPublications() {
  return seedPublications;
}
export async function getPublication(slug) {
  const publication = await apiFetch(`/api/publications/${slug}`);
  return publication ?? seedPublications.find((item) => item.slug === slug) ?? seedPublications[0];
}
