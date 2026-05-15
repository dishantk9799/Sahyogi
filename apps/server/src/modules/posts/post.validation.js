import { z } from "zod";
import { objectIdSchema } from "../../validators/object-id.validation.js";
const contentSchema = z.object({
  html: z.string().default(""),
  text: z.string().default(""),
  json: z.unknown().optional(),
});
const seoSchema = z.object({
  title: z.string().trim().max(70).optional().default(""),
  description: z.string().trim().max(160).optional().default(""),
});
export const createPostSchema = z.object({
  publicationId: objectIdSchema("publicationId"),
  title: z.string().trim().min(3).max(140),
  slug: z.string().trim().min(3).max(160).optional(),
  subtitle: z.string().trim().max(240).optional().default(""),
  coverImageUrl: z.string().url().optional().or(z.literal("")).default(""),
  content: contentSchema.optional().default({ html: "", text: "" }),
  tags: z.array(z.string().trim().min(1).max(32)).max(8).optional().default([]),
  category: z.string().trim().max(40).optional().default("General"),
  seo: seoSchema.optional().default({ title: "", description: "" }),
  scheduledFor: z.coerce.date().optional(),
});
export const updatePostSchema = createPostSchema.partial().omit({ publicationId: true });
export const postIdParamsSchema = z.object({
  id: objectIdSchema("id"),
});
export const postSlugParamsSchema = z.object({
  slug: z.string().trim().min(3).max(160),
});
export const listPostsQuerySchema = z.object({
  search: z.string().trim().max(80).optional(),
  tag: z.string().trim().max(32).optional(),
  cursor: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});
