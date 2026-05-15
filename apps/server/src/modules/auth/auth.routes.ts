import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware";
import { authRateLimiter } from "../../middlewares/rate-limit.middleware";
import { validateRequest } from "../../middlewares/validate.middleware";
import { authController } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post("/signup", authRateLimiter, validateRequest(signupSchema), authController.signup);
authRoutes.post("/register", authRateLimiter, validateRequest(signupSchema), authController.signup);
authRoutes.post("/login", authRateLimiter, validateRequest(loginSchema), authController.login);
authRoutes.post("/refresh", authController.refresh);
authRoutes.post("/logout", authController.logout);
authRoutes.get("/me", requireAuth, authController.me);
