import type { Request, Response } from "express";
import {
  ACCESS_TOKEN_COOKIE,
  accessCookieOptions,
  REFRESH_TOKEN_COOKIE,
  refreshCookieOptions,
} from "../../constants/cookies";
import { HttpStatus } from "../../constants/http";
import { asyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { authService } from "./auth.service";

function contextFromRequest(req: Request) {
  return {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  };
}

function setAuthCookies(res: Response, tokens: { accessToken: string; refreshToken: string }) {
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, accessCookieOptions);
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshCookieOptions);
}

function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_TOKEN_COOKIE, accessCookieOptions);
  res.clearCookie(REFRESH_TOKEN_COOKIE, refreshCookieOptions);
}

export const authController = {
  signup: asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body, contextFromRequest(req));
    setAuthCookies(res, result.tokens);
    res.status(HttpStatus.CREATED).json(new ApiResponse(HttpStatus.CREATED, result.user, "Account created"));
  }),

  login: asyncHandler(async (req, res) => {
    const result = await authService.login(req.body, contextFromRequest(req));
    setAuthCookies(res, result.tokens);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, result.user, "Logged in"));
  }),

  refresh: asyncHandler(async (req, res) => {
    const result = await authService.refresh(req.cookies?.[REFRESH_TOKEN_COOKIE]);
    setAuthCookies(res, result.tokens);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, result.user, "Session refreshed"));
  }),

  logout: asyncHandler(async (req, res) => {
    await authService.logout(req.cookies?.[REFRESH_TOKEN_COOKIE]);
    clearAuthCookies(res);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, null, "Logged out"));
  }),

  me: asyncHandler(async (req, res) => {
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, req.user, "Current user"));
  }),
};
