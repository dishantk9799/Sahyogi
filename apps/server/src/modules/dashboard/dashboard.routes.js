import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { dashboardController } from "./dashboard.controller.js";
export const dashboardRoutes = Router();
dashboardRoutes.get("/", requireAuth, dashboardController.overview);
