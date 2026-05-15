import { z } from "zod";
import { objectIdSchema } from "../../validators/object-id.validation.js";
import { requirePatchFields } from "../../validators/patch.validation.js";

const publicationSlugSchema = z
  .string()
  .trim()
  .min(3)
  .max(80)
  .regex(/^[a-zA-Z0-9-]+$/);
const optionalUrlSchema = z.string().url().optional().or(z.literal(""));
const accentColorSchema = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .optional();

export const createPublicationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: publicationSlugSchema.optional(),
  description: z.string().trim().max(800).optional().default(""),
  tagline: z.string().trim().max(140).optional().default(""),
  logoUrl: optionalUrlSchema,
  coverUrl: optionalUrlSchema,
  accentColor: accentColorSchema,
});
export const updatePublicationSchema = requirePatchFields(
  z.object({
    name: z.string().trim().min(2).max(80).optional(),
    slug: publicationSlugSchema.optional(),
    description: z.string().trim().max(800).optional(),
    tagline: z.string().trim().max(140).optional(),
    logoUrl: optionalUrlSchema,
    coverUrl: optionalUrlSchema,
    accentColor: accentColorSchema,
  }),
);
export const publicationSlugParamsSchema = z.object({
  slug: z.string().trim().min(3).max(80),
});
export const publicationIdParamsSchema = z.object({
  id: objectIdSchema("id"),
});
export const subscribeSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  source: z.string().trim().max(80).optional().default("web"),
});
export const unsubscribeSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
});
export const listSubscribersQuerySchema = z.object({
  search: z.string().trim().max(120).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
});
