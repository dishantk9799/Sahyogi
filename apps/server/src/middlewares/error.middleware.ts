import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { isProduction } from "../configs/env";
import { HttpStatus } from "../constants/http";
import { ApiError } from "../utils/api-error";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: "Request validation failed",
      details: err.flatten(),
      requestId: req.requestId,
    });
  }

  const statusCode =
    err instanceof ApiError ? err.statusCode : err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    details: err instanceof ApiError ? err.details : undefined,
    requestId: req.requestId,
    stack: isProduction ? undefined : err.stack,
  });
};
