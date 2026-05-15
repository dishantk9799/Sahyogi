import { z } from "zod";
import { objectIdSchema } from "../../validators/object-id.validation.js";
import { requirePatchFields } from "../../validators/patch.validation.js";

const slugSchema = z
  .string()
  .trim()
  .min(3)
  .max(160)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

const contentSchema = z.object({
  html: z.string().default(""),
  text: z.string().default(""),
  json: z.unknown().optional(),
});
const updateContentSchema = z.object({
  html: z.string().optional(),
  text: z.string().optional(),
  json: z.unknown().optional(),
});
const seoSchema = z.object({
  title: z.string().trim().max(70).optional().default(""),
  description: z.string().trim().max(160).optional().default(""),
});
const updateSeoSchema = z.object({
  title: z.string().trim().max(70).optional(),
  description: z.string().trim().max(160).optional(),
});
export const createPostSchema = z.object({
  publicationId: objectIdSchema("publicationId"),
  title: z.string().trim().min(3).max(140),
  slug: slugSchema.optional(),
  subtitle: z.string().trim().max(240).optional().default(""),
  coverImageUrl: z.string().url().optional().or(z.literal("")).default(""),
  content: contentSchema.optional().default({ html: "", text: "" }),
  tags: z.array(z.string().trim().min(1).max(32)).max(8).optional().default([]),
  category: z.string().trim().max(40).optional().default("General"),
  seo: seoSchema.optional().default({ title: "", description: "" }),
  scheduledFor: z.coerce.date().optional(),
});
export const updatePostSchema = requirePatchFields(
  z.object({
    title: z.string().trim().min(3).max(140).optional(),
    slug: slugSchema.optional(),
    subtitle: z.string().trim().max(240).optional(),
    coverImageUrl: z.string().url().optional().or(z.literal("")),
    content: updateContentSchema.optional(),
    tags: z.array(z.string().trim().min(1).max(32)).max(8).optional(),
    category: z.string().trim().max(40).optional(),
    seo: updateSeoSchema.optional(),
    scheduledFor: z.coerce.date().optional(),
  }),
);
export const postIdParamsSchema = z.object({
  id: objectIdSchema("id"),
});
export const postSlugParamsSchema = z.object({
  slug: z.string().trim().min(3).max(160),
});
export const listPostsQuerySchema = z.object({
  search: z.string().trim().max(80).optional(),
  tag: z.string().trim().max(32).optional(),
  publicationSlug: z.string().trim().min(3).max(80).optional(),
  cursor: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});
