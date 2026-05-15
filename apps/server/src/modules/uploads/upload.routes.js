import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";
import { uploadsController } from "./upload.controller.js";

export const uploadRoutes = Router();

uploadRoutes.post("/image", requireAuth, upload.single("image"), uploadsController.uploadImage);
