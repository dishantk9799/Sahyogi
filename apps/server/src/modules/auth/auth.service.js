import bcrypt from "bcryptjs";
import { env } from "../../configs/env.js";
import { HttpStatus } from "../../constants/http.js";
import { ApiError } from "../../utils/api-error.js";
import { createOpaqueToken, hashToken } from "../../utils/crypto.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { User } from "../users/user.model.js";
import { usersRepository } from "../users/user.repository.js";
import { toSafeUser } from "../users/user.serializer.js";
import { authRepository } from "./auth.repository.js";
function parseDurationToDate(value) {
  const dayMs = 24 * 60 * 60 * 1000;
  const match = /^(\d+)([smhd])$/.exec(value);
  const amount = Number(match?.[1] ?? 30);
  const unit = match?.[2] ?? "d";
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: dayMs,
  };
  const multiplier = multipliers[unit] ?? dayMs;
  return new Date(Date.now() + amount * multiplier);
}
async function createTokens(user, context) {
  const tokenId = createOpaqueToken(16);
  const session = await authRepository.createSession({
    userId: user.id,
    tokenId,
    refreshTokenHash: "pending",
    userAgent: context.userAgent ?? "",
    ipAddress: context.ipAddress ?? "",
    expiresAt: parseDurationToDate(env.REFRESH_TOKEN_TTL),
  });
  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
  const refreshToken = signRefreshToken(session._id.toString(), tokenId);
  session.refreshTokenHash = hashToken(refreshToken);
  await session.save();
  return { accessToken, refreshToken };
}
export const authService = {
  async signup(input, context) {
    const existingUser = await usersRepository.findByEmailOrUsername(input.email, input.username);
    if (existingUser) {
      throw new ApiError(HttpStatus.CONFLICT, "Email or username is already in use");
    }
    const passwordHash = await User.hashPassword(input.password);
    const user = await usersRepository.create({
      fullName: input.fullName,
      username: input.username,
      email: input.email,
      passwordHash,
    });
    const safeUser = toSafeUser(user);
    const tokens = await createTokens(safeUser, context);
    return { user: safeUser, tokens };
  },
  async login(input, context) {
    const user = await usersRepository.findByEmail(input.email, true);
    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }
    const safeUser = toSafeUser(user);
    const tokens = await createTokens(safeUser, context);
    return { user: safeUser, tokens };
  },
  async refresh(refreshToken) {
    const payload = verifyRefreshToken(refreshToken);
    const session = await authRepository.findSessionById(payload.sid);
    if (
      !session ||
      session.revokedAt ||
      session.tokenId !== payload.tid ||
      session.refreshTokenHash !== hashToken(refreshToken) ||
      session.expiresAt.getTime() <= Date.now()
    ) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid refresh session");
    }
    const user = await usersRepository.findById(session.userId.toString());
    if (!user) {
      throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid refresh session");
    }
    const safeUser = toSafeUser(user);
    const nextTokenId = createOpaqueToken(16);
    const accessToken = signAccessToken({
      sub: safeUser.id,
      email: safeUser.email,
      role: safeUser.role,
    });
    const nextRefreshToken = signRefreshToken(session._id.toString(), nextTokenId);
    await authRepository.rotateSession(session._id.toString(), {
      tokenId: nextTokenId,
      refreshTokenHash: hashToken(nextRefreshToken),
      expiresAt: parseDurationToDate(env.REFRESH_TOKEN_TTL),
    });
    return {
      user: safeUser,
      tokens: {
        accessToken,
        refreshToken: nextRefreshToken,
      },
    };
  },
  async logout(refreshToken) {
    if (!refreshToken) {
      return;
    }
    try {
      const payload = verifyRefreshToken(refreshToken);
      await authRepository.revokeSession(payload.sid);
    } catch {
      return;
    }
  },
};
