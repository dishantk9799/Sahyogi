import mongoose from "mongoose";
import { HttpStatus } from "../../constants/http";
import { ApiError } from "../../utils/api-error";
import { calculateReadTime } from "../../utils/read-time";
import { createSlug } from "../../utils/slug";
import { publicationsRepository } from "../publications/publication.repository";
import type { SafeUser } from "../users/user.types";
import { postsRepository } from "./post.repository";
import { toPostDTO } from "./post.serializer";
import type { createPostSchema, listPostsQuerySchema, updatePostSchema } from "./post.validation";
import type { z } from "zod";

async function assertPublicationOwner(publicationId: string, user: SafeUser) {
  const publication = await publicationsRepository.findById(publicationId);

  if (!publication) {
    throw new ApiError(HttpStatus.NOT_FOUND, "Publication not found");
  }

  if (publication.ownerId.toString() !== user.id) {
    throw new ApiError(HttpStatus.FORBIDDEN, "Only the publication owner can manage posts");
  }

  return publication;
}

export const postsService = {
  async listPublished(query: z.infer<typeof listPostsQuerySchema>) {
    const posts = await postsRepository.findPublished({
      limit: query.limit,
      ...(query.search ? { search: query.search } : {}),
      ...(query.tag ? { tag: query.tag } : {}),
      ...(query.cursor ? { cursor: query.cursor } : {}),
    });

    return {
      items: posts.map(toPostDTO),
      nextCursor: posts.length ? posts.at(-1)?.publishedAt?.toISOString() : null,
    };
  },

  async getPublished(slug: string) {
    const post = await postsRepository.findBySlug(slug);

    if (!post) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Post not found");
    }

    return toPostDTO(post);
  },

  async listMine(user: SafeUser) {
    const posts = await postsRepository.findByAuthor(user.id);
    return posts.map(toPostDTO);
  },

  async create(user: SafeUser, data: z.infer<typeof createPostSchema>) {
    await assertPublicationOwner(data.publicationId, user);

    const slug = data.slug?.toLowerCase() || createSlug(data.title);
    const post = await postsRepository.create({
      publicationId: new mongoose.Types.ObjectId(data.publicationId),
      authorId: new mongoose.Types.ObjectId(user.id),
      title: data.title,
      slug,
      subtitle: data.subtitle,
      coverImageUrl: data.coverImageUrl,
      content: data.content,
      status: data.scheduledFor ? "scheduled" : "draft",
      tags: data.tags,
      category: data.category,
      readTimeMinutes: calculateReadTime(data.content.text),
      seo: {
        title: data.seo.title || data.title,
        description: data.seo.description || data.subtitle,
      },
      scheduledFor: data.scheduledFor,
    });

    return toPostDTO(post);
  },

  async update(user: SafeUser, postId: string, data: z.infer<typeof updatePostSchema>) {
    const post = await postsRepository.findById(postId);

    if (!post) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Post not found");
    }

    await assertPublicationOwner(post.publicationId.toString(), user);

    const update: Record<string, unknown> = { ...data };
    if (data.slug) {
      update.slug = data.slug.toLowerCase();
    }
    if (data.content?.text) {
      update.readTimeMinutes = calculateReadTime(data.content.text);
    }
    update.seo = {
      title: data.seo?.title || data.title || post.seo.title || post.title,
      description: data.seo?.description || data.subtitle || post.seo.description,
    };

    const updated = await postsRepository.updateById(postId, update);

    return toPostDTO(updated!);
  },

  async publish(user: SafeUser, postId: string) {
    const post = await postsRepository.findById(postId);

    if (!post) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Post not found");
    }

    await assertPublicationOwner(post.publicationId.toString(), user);

    const updated = await postsRepository.updateById(postId, {
      status: "published",
      publishedAt: post.publishedAt ?? new Date(),
      scheduledFor: undefined,
    });

    return toPostDTO(updated!);
  },

  async unpublish(user: SafeUser, postId: string) {
    const post = await postsRepository.findById(postId);

    if (!post) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Post not found");
    }

    await assertPublicationOwner(post.publicationId.toString(), user);

    const updated = await postsRepository.updateById(postId, {
      status: "draft",
      publishedAt: undefined,
      scheduledFor: undefined,
    });

    return toPostDTO(updated!);
  },
};
