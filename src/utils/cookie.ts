import { Response } from "express";

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  maxAge?: number;
  path?: string;
}

const DEFAULT_REFRESH_TOKEN_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  path: "/",
};

export function setRefreshTokenCookie(
  res: Response,
  refreshToken: string,
  options: CookieOptions = {}
): void {
  const cookieOptions = { ...DEFAULT_REFRESH_TOKEN_OPTIONS, ...options };

  res.cookie("refreshToken", refreshToken, {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    maxAge: cookieOptions.maxAge,
    path: cookieOptions.path,
  });
}
