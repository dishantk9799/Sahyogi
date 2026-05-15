import { isProduction } from "../configs/env.js";
export const ACCESS_TOKEN_COOKIE = "sahyogi_access";
export const REFRESH_TOKEN_COOKIE = "sahyogi_refresh";

function withoutMaxAge(options) {
  const clearOptions = { ...options };
  delete clearOptions.maxAge;
  return clearOptions;
}

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 15 * 60 * 1000,
  path: "/",
};
export const refreshCookieOptions = {
  ...accessCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};
export const clearAccessCookieOptions = withoutMaxAge(accessCookieOptions);
export const clearRefreshCookieOptions = withoutMaxAge(refreshCookieOptions);
