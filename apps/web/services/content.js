import { seedPosts, seedPublications } from "@/services/seed-data";
import { apiRootUrl, buildApiUrl } from "@/services/api-config";

function withQuery(path, params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `${path}?${queryString}` : path;
}

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
export async function getFeaturedPosts(params = {}) {
  const posts = await apiFetch(withQuery("/api/posts", params));
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
  const publications = await apiFetch("/api/publications");
  if (publications?.length) {
    return publications;
  }

  return apiRootUrl ? [] : seedPublications;
}
export async function getPublication(slug) {
  const publication = await apiFetch(`/api/publications/${slug}`);
  return (
    publication ??
    (!apiRootUrl ? seedPublications.find((item) => item.slug === slug) : null) ??
    null
  );
}
export async function getPublicationPosts(slug) {
  const posts = await apiFetch(`/api/posts?publicationSlug=${encodeURIComponent(slug)}`);
  if (posts?.length) {
    return posts;
  }

  return apiRootUrl ? [] : seedPosts.filter((post) => post.publication.slug === slug);
}
