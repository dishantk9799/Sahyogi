import jwt from "jsonwebtoken";
import { env } from "../configs/env.js";
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
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
}
export function verifyRefreshToken(token) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
}
