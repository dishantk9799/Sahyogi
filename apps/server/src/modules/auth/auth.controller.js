import {
  ACCESS_TOKEN_COOKIE,
  accessCookieOptions,
  REFRESH_TOKEN_COOKIE,
  refreshCookieOptions,
} from "../../constants/cookies.js";
import { HttpStatus } from "../../constants/http.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { authService } from "./auth.service.js";
function contextFromRequest(req) {
  return {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  };
}
function setAuthCookies(res, tokens) {
  res.cookie(ACCESS_TOKEN_COOKIE, tokens.accessToken, accessCookieOptions);
  res.cookie(REFRESH_TOKEN_COOKIE, tokens.refreshToken, refreshCookieOptions);
}
function clearAuthCookies(res) {
  res.clearCookie(ACCESS_TOKEN_COOKIE, accessCookieOptions);
  res.clearCookie(REFRESH_TOKEN_COOKIE, refreshCookieOptions);
}
export const authController = {
  signup: asyncHandler(async (req, res) => {
    const result = await authService.signup(req.body, contextFromRequest(req));
    setAuthCookies(res, result.tokens);
    res
      .status(HttpStatus.CREATED)
      .json(new ApiResponse(HttpStatus.CREATED, result.user, "Account created"));
  }),
  login: asyncHandler(async (req, res) => {
    const result = await authService.login(req.body, contextFromRequest(req));
    setAuthCookies(res, result.tokens);
    res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, result.user, "Logged in"));
  }),
  refresh: asyncHandler(async (req, res) => {
    const result = await authService.refresh(req.cookies?.[REFRESH_TOKEN_COOKIE]);
    setAuthCookies(res, result.tokens);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(HttpStatus.OK, result.user, "Session refreshed"));
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
