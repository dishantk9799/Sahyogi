import type { ApiEnvelope } from "@/services/api";
import { seedPosts, seedPublications } from "@/services/seed-data";
import type { Post, Publication } from "@/types/content";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(path: string): Promise<T | null> {
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

    const envelope = (await response.json()) as ApiEnvelope<T>;
    return envelope.data;
  } catch {
    return null;
  }
}

export async function getFeaturedPosts() {
  const posts = await apiFetch<Post[]>("/api/posts");
  return posts?.length ? posts : seedPosts;
}

export async function getPost(slug: string) {
  const post = await apiFetch<Post>(`/api/posts/${slug}`);
  return post ?? seedPosts.find((item) => item.slug === slug) ?? seedPosts[0]!;
}

export async function getPublications() {
  return seedPublications;
}

export async function getPublication(slug: string) {
  const publication = await apiFetch<Publication>(`/api/publications/${slug}`);
  return publication ?? seedPublications.find((item) => item.slug === slug) ?? seedPublications[0]!;
}
