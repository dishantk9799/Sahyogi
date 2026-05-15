import dotenv from "dotenv";
import { z } from "zod";
dotenv.config({ quiet: true });

const booleanEnv = z.preprocess((value) => {
  if (typeof value === "string") {
    return ["true", "1", "yes", "on"].includes(value.toLowerCase());
  }

  return value;
}, z.boolean());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  CLIENT_URL: z.string().url().default("http://localhost:3000"),
  API_PUBLIC_URL: z.string().url().optional().or(z.literal("")).default(""),
  ENABLE_SWAGGER: booleanEnv.default(false),
  TRUST_PROXY: booleanEnv.default(false),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_ACCESS_SECRET: z.string().min(24, "JWT_ACCESS_SECRET must be at least 24 characters"),
  JWT_REFRESH_SECRET: z.string().min(24, "JWT_REFRESH_SECRET must be at least 24 characters"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("30d"),
  CLOUDINARY_NAME: z.string().optional().default(""),
  CLOUDINARY_API_KEY: z.string().optional().default(""),
  CLOUDINARY_API_SECRET: z.string().optional().default(""),
  SMTP_HOST: z.string().optional().default(""),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional().default(""),
  SMTP_PASS: z.string().optional().default(""),
  MAIL_FROM: z.string().default("Sahyogi <hello@sahyogi.local>"),
});
const testDefaults = {
  MONGO_URI: "mongodb://127.0.0.1:27017/sahyogi-test",
  JWT_ACCESS_SECRET: "test-access-secret-with-enough-length",
  JWT_REFRESH_SECRET: "test-refresh-secret-with-enough-length",
};
const rawEnv = {
  ...(process.env.NODE_ENV === "test" ? testDefaults : {}),
  ...process.env,
};
const parsedEnv = envSchema.safeParse(rawEnv);
if (!parsedEnv.success) {
  const message = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${message}`);
}
export const env = parsedEnv.data;
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
