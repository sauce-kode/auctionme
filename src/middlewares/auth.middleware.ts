import { NextFunction, Request, Response } from "express";
import { TokenPayload, User } from "../shared";
import { sendError } from "../utils";
import jwt from "jsonwebtoken";
import { env } from "../config";
import { findUserById, getUserById } from "../modules/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendError(res, "Authentication Required", 401);
    return;
  }

  const token = authHeader.substring(7); // Remove "Bearer " prefix

  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;

  if (!decoded) {
    sendError(res, "Authentication Required", 401);
    return;
  }

  const user = await findUserById(decoded.userId);

  if (!user) {
    sendError(res, "Authentication Required", 401);
    return;
  }

  req.user = user;
  next();
};
