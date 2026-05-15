import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { publicationsController } from "./publication.controller";
import {
  createPublicationSchema,
  publicationIdParamsSchema,
  publicationSlugParamsSchema,
  subscribeSchema,
  updatePublicationSchema,
} from "./publication.validation";

export const publicationRoutes = Router();

publicationRoutes.get("/mine", requireAuth, publicationsController.listMine);
publicationRoutes.post("/", requireAuth, validateRequest(createPublicationSchema), publicationsController.create);
publicationRoutes.get(
  "/:slug",
  validateRequest(publicationSlugParamsSchema, "params"),
  publicationsController.getBySlug,
);
publicationRoutes.patch(
  "/:id",
  requireAuth,
  validateRequest(publicationIdParamsSchema, "params"),
  validateRequest(updatePublicationSchema),
  publicationsController.update,
);
publicationRoutes.post(
  "/:slug/subscribe",
  validateRequest(publicationSlugParamsSchema, "params"),
  validateRequest(subscribeSchema),
  publicationsController.subscribe,
);
