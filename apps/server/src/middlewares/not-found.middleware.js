import { HttpStatus } from "../constants/http.js";
export function notFoundMiddleware(req, res) {
  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found`,
    requestId: req.requestId,
  });
}
