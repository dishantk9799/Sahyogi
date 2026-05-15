import { z } from "zod";

const optionalUrl = z.string().trim().url("Enter a valid URL").or(z.literal("")).optional();

export const profileSettingsSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  bio: z.string().trim().max(280, "Bio must be 280 characters or less").optional(),
  avatarUrl: optionalUrl,
  bannerUrl: optionalUrl,
  socials: z.object({
    website: optionalUrl,
    github: optionalUrl,
    linkedin: optionalUrl,
    twitter: optionalUrl,
  }),
});

export const publicationSettingsSchema = z.object({
  name: z.string().trim().min(2, "Publication name is required").max(80),
  slug: z
    .string()
    .trim()
    .min(3, "Slug must be at least 3 characters")
    .max(80)
    .regex(/^[a-zA-Z0-9-]+$/, "Use letters, numbers, and hyphens only"),
  description: z.string().trim().max(800, "Description must be 800 characters or less").optional(),
  tagline: z.string().trim().max(140, "Tagline must be 140 characters or less").optional(),
  logoUrl: optionalUrl,
  coverUrl: optionalUrl,
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a hex color like #111827"),
});
