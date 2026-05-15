import type { CookieOptions } from "express";
import { isProduction } from "../configs/env";

export const ACCESS_TOKEN_COOKIE = "sahyogi_access";
export const REFRESH_TOKEN_COOKIE = "sahyogi_refresh";

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 15 * 60 * 1000,
  path: "/",
};

export const refreshCookieOptions: CookieOptions = {
  ...accessCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};
