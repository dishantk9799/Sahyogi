import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { dashboardController } from "./dashboard.controller";

export const dashboardRoutes = Router();

dashboardRoutes.get("/", requireAuth, dashboardController.overview);
