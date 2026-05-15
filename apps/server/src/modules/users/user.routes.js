import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { usersController } from "./user.controller.js";
import { updateProfileSchema, usernameParamsSchema } from "./user.validation.js";
export const userRoutes = Router();
userRoutes.get(
  "/:username",
  validateRequest(usernameParamsSchema, "params"),
  usersController.getProfile,
);
userRoutes.patch(
  "/me/profile",
  requireAuth,
  validateRequest(updateProfileSchema),
  usersController.updateMe,
);
