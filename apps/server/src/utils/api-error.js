export class ApiError extends Error {
  statusCode;
  details;
  isOperational = true;
  constructor(statusCode, message, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
