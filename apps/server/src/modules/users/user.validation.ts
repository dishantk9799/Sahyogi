import { z } from "zod";

const socialsSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
});

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  bio: z.string().trim().max(280).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bannerUrl: z.string().url().optional().or(z.literal("")),
  socials: socialsSchema.optional(),
});

export const usernameParamsSchema = z.object({
  username: z.string().trim().min(3).max(32),
});
