import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";
let configured = false;
export function getCloudinaryClient() {
  if (!configured) {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
    });
    configured = true;
  }
  return cloudinary;
}
