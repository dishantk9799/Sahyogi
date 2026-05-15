import { HttpStatus } from "../constants/http.js";
import { ApiError } from "../utils/api-error.js";
export function validateRequest(schema, target = "body") {
  return (req, _res, next) => {
    const parsed = schema.safeParse(req[target]);
    if (!parsed.success) {
      return next(
        new ApiError(
          HttpStatus.UNPROCESSABLE_ENTITY,
          "Request validation failed",
          parsed.error.flatten(),
        ),
      );
    }
    req[target] = parsed.data;
    return next();
  };
}
