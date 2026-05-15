import { z } from "zod";

const objectIdPattern = /^[a-f\d]{24}$/i;

export function objectIdSchema(fieldName = "id") {
  return z
    .string()
    .trim()
    .regex(objectIdPattern, `${fieldName} must be a valid MongoDB ObjectId`);
}
