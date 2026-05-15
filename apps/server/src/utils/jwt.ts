import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../configs/env";

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export function signAccessToken(payload: AccessTokenPayload) {
  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_TTL as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET as Secret, options);
}

export function signRefreshToken(sessionId: string, tokenId: string) {
  const options: SignOptions = {
    expiresIn: env.REFRESH_TOKEN_TTL as NonNullable<SignOptions["expiresIn"]>,
  };

  return jwt.sign(
    {
      sid: sessionId,
      tid: tokenId,
    },
    env.JWT_REFRESH_SECRET as Secret,
    options,
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sid: string; tid: string };
}
