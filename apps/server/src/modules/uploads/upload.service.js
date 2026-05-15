import { Readable } from "node:stream";
import { env } from "../../configs/env.js";
import { getCloudinaryClient } from "../../configs/cloudinary.js";
import { HttpStatus } from "../../constants/http.js";
import { ApiError } from "../../utils/api-error.js";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function assertCloudinaryConfig() {
  if (!env.CLOUDINARY_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new ApiError(HttpStatus.SERVICE_UNAVAILABLE, "Image uploads are not configured");
  }
}

function uploadBuffer(file, folder) {
  const cloudinary = getCloudinaryClient();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
}

export const uploadsService = {
  async uploadImage(file) {
    if (!file) {
      throw new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, "Image file is required");
    }

    if (!allowedImageTypes.has(file.mimetype)) {
      throw new ApiError(
        HttpStatus.UNPROCESSABLE_ENTITY,
        "Only JPG, PNG, WebP, and GIF images are allowed",
      );
    }

    assertCloudinaryConfig();

    const result = await uploadBuffer(file, "sahyogi");

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  },
};
