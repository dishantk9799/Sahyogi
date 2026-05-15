import { z } from "zod";

export const editorPostSchema = z.object({
  publicationId: z.string().min(1, "Choose a publication"),
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(140),
  subtitle: z.string().trim().max(240).optional(),
  coverImageUrl: z.string().trim().url("Enter a valid image URL").or(z.literal("")).optional(),
  category: z.string().trim().max(40).optional(),
  tags: z.array(z.string().trim().min(1).max(32)).max(8).optional(),
  seo: z
    .object({
      title: z.string().trim().max(70).optional(),
      description: z.string().trim().max(160).optional(),
    })
    .optional(),
  content: z.object({
    html: z.string().default(""),
    text: z.string().default(""),
  }),
});
