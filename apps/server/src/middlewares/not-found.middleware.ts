import type { Request, Response } from "express";
import { HttpStatus } from "../constants/http";

export function notFoundMiddleware(req: Request, res: Response) {
  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found`,
    requestId: req.requestId,
  });
}
