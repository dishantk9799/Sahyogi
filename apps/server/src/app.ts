import "express-async-errors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env, isProduction, isTest } from "./configs/env";
import { swaggerSpec } from "./configs/swagger";
import { apiRateLimiter } from "./middlewares/rate-limit.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { requestIdMiddleware } from "./middlewares/request-id.middleware";
import { apiRoutes } from "./routes";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(requestIdMiddleware);
  app.use(helmet());
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());
  app.use(mongoSanitize());

  if (!isTest) {
    app.use(morgan(isProduction ? "combined" : "dev"));
  }

  app.use("/api", apiRateLimiter, apiRoutes);
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}

export default createApp();
