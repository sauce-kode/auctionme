import { dbToApi, handleControllerError, sendSuccess } from "../../../utils";
import {
  forgotPasswordSchema,
  loginSchema,
  verifyResetPasswordOtpSchema,
  signupSchema,
  resetPasswordSchema,
} from "../validation";
import {
  userLogin,
  userResetPassword,
  userSignup,
  userVerifyResetPasswordOtp,
  userforgotPassword,
} from "../services";
import { Request, Response } from "express";
import { setRefreshTokenCookie } from "../../../utils/cookie";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const validData = signupSchema.parse(req.body);
    const createdUser = await userSignup(validData);

    sendSuccess(res, "Signed up successfully", 201, dbToApi(createdUser));
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validData = loginSchema.parse(req.body);
    const login = await userLogin(validData);

    const { refreshToken, ...others } = login;
    setRefreshTokenCookie(res, refreshToken);
    sendSuccess(res, "Login successfully", 200, others);
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validaData = forgotPasswordSchema.parse(req.body);
    await userforgotPassword(validaData);

    sendSuccess(
      res,
      "If your account exists, we sent password reset instructions."
    );
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const verifyResetPasswordOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validaData = verifyResetPasswordOtpSchema.parse(req.body);
    await userVerifyResetPasswordOtp(validaData);

    sendSuccess(res, "OTP verified.");
  } catch (error) {
    handleControllerError(res, error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validaData = resetPasswordSchema.parse(req.body);
    await userResetPassword(validaData);

    sendSuccess(res, "Password reset successful.");
  } catch (error) {
    handleControllerError(res, error);
  }
};
