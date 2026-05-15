import rateLimit from "express-rate-limit";
import { isTest } from "../configs/env.js";
import { HttpStatus } from "../constants/http.js";
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skip: () => isTest,
  standardHeaders: true,
  legacyHeaders: false,
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 180,
  skip: () => isTest,
  standardHeaders: true,
  legacyHeaders: false,
});
