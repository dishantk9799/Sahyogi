import { z } from "zod";
export const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  username: z
    .string()
    .trim()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .transform((value) => value.toLowerCase()),
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(8).max(128),
});
export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});
