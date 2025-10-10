import { env } from "../config";
import { Response } from "express";

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}

/**
 *
 * httpOnly: when set to true, means the cookie is inaccessible to Javascript running in the browser. document.cookie
 * secure: when set to true, the cookie will only be sent over HTTPS connection
 * sameSite: controls whether cookies are sent along with cross-site requests
 */

const DEFAULT_REFRESH_TOKEN_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.APP_ENV === "production" ? true : false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  path: "/",
};

export function setRefreshTokenCookie(
  res: Response,
  refreshToken: string,
  options: CookieOptions = {}
): void {
  const cookieOptions = { ...DEFAULT_REFRESH_TOKEN_OPTIONS, ...options };

  res.cookie("refreshToken", refreshToken, { ...cookieOptions });
}
