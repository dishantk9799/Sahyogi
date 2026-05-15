import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { HttpStatus } from "../constants/http";
import { ApiError } from "../utils/api-error";

type ValidationTarget = "body" | "params" | "query";

export function validateRequest(schema: ZodType, target: ValidationTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[target]);

    if (!parsed.success) {
      return next(
        new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, "Request validation failed", parsed.error.flatten()),
      );
    }

    req[target] = parsed.data;
    return next();
  };
}
