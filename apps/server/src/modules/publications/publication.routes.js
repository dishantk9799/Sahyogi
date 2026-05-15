import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { publicationsController } from "./publication.controller.js";
import {
  createPublicationSchema,
  listSubscribersQuerySchema,
  publicationIdParamsSchema,
  publicationSlugParamsSchema,
  subscribeSchema,
  unsubscribeSchema,
  updatePublicationSchema,
} from "./publication.validation.js";
export const publicationRoutes = Router();
publicationRoutes.get("/", publicationsController.listPublic);
publicationRoutes.get("/mine", requireAuth, publicationsController.listMine);
publicationRoutes.post(
  "/",
  requireAuth,
  validateRequest(createPublicationSchema),
  publicationsController.create,
);
publicationRoutes.get(
  "/:id/subscribers",
  requireAuth,
  validateRequest(publicationIdParamsSchema, "params"),
  validateRequest(listSubscribersQuerySchema, "query"),
  publicationsController.listSubscribers,
);
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
publicationRoutes.post(
  "/:slug/unsubscribe",
  validateRequest(publicationSlugParamsSchema, "params"),
  validateRequest(unsubscribeSchema),
  publicationsController.unsubscribe,
);
