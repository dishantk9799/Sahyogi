import jwt from "jsonwebtoken";
import { env } from "../configs/env.js";

function isTokenObject(payload) {
  return payload && typeof payload === "object" && !Array.isArray(payload);
}

export function signAccessToken(payload) {
  const options = {
    expiresIn: env.ACCESS_TOKEN_TTL,
  };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, options);
}
export function signRefreshToken(sessionId, tokenId) {
  const options = {
    expiresIn: env.REFRESH_TOKEN_TTL,
  };
  return jwt.sign(
    {
      sid: sessionId,
      tid: tokenId,
    },
    env.JWT_REFRESH_SECRET,
    options,
  );
}
export function verifyAccessToken(token) {
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);

  if (
    !isTokenObject(payload) ||
    typeof payload.sub !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.role !== "string"
  ) {
    throw new Error("Invalid access token payload");
  }

  return payload;
}
export function verifyRefreshToken(token) {
  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);

  if (!isTokenObject(payload) || typeof payload.sid !== "string" || typeof payload.tid !== "string") {
    throw new Error("Invalid refresh token payload");
  }

  return payload;
}
