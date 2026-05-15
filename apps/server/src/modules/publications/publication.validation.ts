import { z } from "zod";

export const createPublicationSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(80)
    .regex(/^[a-zA-Z0-9-]+$/)
    .optional(),
  description: z.string().trim().max(800).optional().default(""),
  tagline: z.string().trim().max(140).optional().default(""),
});

export const updatePublicationSchema = createPublicationSchema.partial().extend({
  logoUrl: z.string().url().optional().or(z.literal("")),
  coverUrl: z.string().url().optional().or(z.literal("")),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
});

export const publicationSlugParamsSchema = z.object({
  slug: z.string().trim().min(3).max(80),
});

export const publicationIdParamsSchema = z.object({
  id: z.string().trim().min(12),
});

export const subscribeSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  source: z.string().trim().max(80).optional().default("web"),
});
