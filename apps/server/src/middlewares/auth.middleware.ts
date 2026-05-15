import type { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_COOKIE } from "../constants/cookies";
import { HttpStatus } from "../constants/http";
import { usersRepository } from "../modules/users/user.repository";
import { toSafeUser } from "../modules/users/user.serializer";
import { ApiError } from "../utils/api-error";
import { verifyAccessToken } from "../utils/jwt";

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (!token) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Authentication required");
    }

    const payload = verifyAccessToken(token);
    const user = await usersRepository.findById(payload.sub);

    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid session");
    }

    req.user = toSafeUser(user);
    next();
  } catch (error) {
    next(
      error instanceof ApiError
        ? error
        : new ApiError(HttpStatus.UNAUTHORIZED, "Invalid or expired session"),
    );
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(HttpStatus.FORBIDDEN, "You do not have access to this resource"));
    }

    return next();
  };
}
