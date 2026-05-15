import type { PostDocument } from "./post.model";
import type { PostDTO } from "./post.types";

export function toPostDTO(post: PostDocument): PostDTO {
  return {
    id: post._id.toString(),
    publicationId: post.publicationId.toString(),
    authorId: post.authorId.toString(),
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    coverImageUrl: post.coverImageUrl,
    content: post.content,
    status: post.status,
    tags: post.tags,
    category: post.category,
    readTimeMinutes: post.readTimeMinutes,
    seo: post.seo,
    publishedAt: post.publishedAt,
    scheduledFor: post.scheduledFor,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}
