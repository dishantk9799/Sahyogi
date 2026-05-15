import { ACCESS_TOKEN_COOKIE } from "../constants/cookies.js";
import { HttpStatus } from "../constants/http.js";
import { usersRepository } from "../modules/users/user.repository.js";
import { toSafeUser } from "../modules/users/user.serializer.js";
import { ApiError } from "../utils/api-error.js";
import { verifyAccessToken } from "../utils/jwt.js";
export async function requireAuth(req, _res, next) {
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
export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(HttpStatus.FORBIDDEN, "You do not have access to this resource"));
    }
    return next();
  };
}
