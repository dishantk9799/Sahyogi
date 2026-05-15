import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { usersController } from "./user.controller";
import { updateProfileSchema, usernameParamsSchema } from "./user.validation";

export const userRoutes = Router();

userRoutes.get("/:username", validateRequest(usernameParamsSchema, "params"), usersController.getProfile);
userRoutes.patch("/me/profile", requireAuth, validateRequest(updateProfileSchema), usersController.updateMe);
