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
  if (posts?.length) {
    return posts;
  }

  return apiUrl ? [] : seedPosts;
}
export async function getPost(slug) {
  const post = await apiFetch(`/api/posts/${slug}`);
  return post ?? (!apiUrl ? seedPosts.find((item) => item.slug === slug) : null) ?? null;
}
export async function getPublications() {
  return seedPublications;
}
export async function getPublication(slug) {
  const publication = await apiFetch(`/api/publications/${slug}`);
  return (
    publication ?? (!apiUrl ? seedPublications.find((item) => item.slug === slug) : null) ?? null
  );
}
