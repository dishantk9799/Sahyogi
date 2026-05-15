import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { postsController } from "./post.controller";
import {
  createPostSchema,
  listPostsQuerySchema,
  postIdParamsSchema,
  postSlugParamsSchema,
  updatePostSchema,
} from "./post.validation";

export const postRoutes = Router();

postRoutes.get("/", validateRequest(listPostsQuerySchema, "query"), postsController.listPublished);
postRoutes.get("/mine", requireAuth, postsController.listMine);
postRoutes.get("/:slug", validateRequest(postSlugParamsSchema, "params"), postsController.getPublished);
postRoutes.post("/", requireAuth, validateRequest(createPostSchema), postsController.create);
postRoutes.patch(
  "/:id",
  requireAuth,
  validateRequest(postIdParamsSchema, "params"),
  validateRequest(updatePostSchema),
  postsController.update,
);
postRoutes.post(
  "/:id/publish",
  requireAuth,
  validateRequest(postIdParamsSchema, "params"),
  postsController.publish,
);
postRoutes.post(
  "/:id/unpublish",
  requireAuth,
  validateRequest(postIdParamsSchema, "params"),
  postsController.unpublish,
);
