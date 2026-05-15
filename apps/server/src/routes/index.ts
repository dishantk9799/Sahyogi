import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { dashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { postRoutes } from "../modules/posts/post.routes";
import { publicationRoutes } from "../modules/publications/publication.routes";
import { userRoutes } from "../modules/users/user.routes";
import { ApiResponse } from "../utils/api-response";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.status(200).json(
    new ApiResponse(200, {
      status: "ok",
      service: "sahyogi-api",
      timestamp: new Date().toISOString(),
    }),
  );
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/users", userRoutes);
apiRoutes.use("/publications", publicationRoutes);
apiRoutes.use("/posts", postRoutes);
apiRoutes.use("/dashboard", dashboardRoutes);
