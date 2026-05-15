import { seedPosts, seedPublications } from "@/services/seed-data";
import { apiRootUrl, buildApiUrl } from "@/services/api-config";

async function apiFetch(path) {
  const url = buildApiUrl(path);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
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

  return apiRootUrl ? [] : seedPosts;
}
export async function getPost(slug) {
  const post = await apiFetch(`/api/posts/${slug}`);
  return post ?? (!apiRootUrl ? seedPosts.find((item) => item.slug === slug) : null) ?? null;
}
export async function getPublications() {
  return seedPublications;
}
export async function getPublication(slug) {
  const publication = await apiFetch(`/api/publications/${slug}`);
  return (
    publication ??
    (!apiRootUrl ? seedPublications.find((item) => item.slug === slug) : null) ??
    null
  );
}
