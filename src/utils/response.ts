import { Response } from "express";
import { z } from "zod";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
}

export function sendSuccess<T>(
  res: Response,
  message: string,
  statusCode: number,
  data?: T
) {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  errors?: any[]
) {
  const response: ApiResponse = {
    success: false,
    message,
    errors,
  };
  res.status(statusCode).json(response);
}

export function handleControllerError(
  res: Response,
  error: unknown,
  errMsg?: string
) {
  if (error instanceof z.ZodError) {
    sendError(res, "Validation Error", 400, error.issues);
    return;
  }

  if (error instanceof Error) {
    sendError(res, error.message, 409);
    return;
  }

  sendError(res, "Internal server error");
}
