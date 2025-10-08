import { dbToApi, handleControllerError, sendSuccess } from "../../../utils";
import { loginSchema, signupSchema } from "../validation";
import { userLogin, userSignup } from "../services";
import { Request, Response } from "express";

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

    sendSuccess(res, "Login successfully", 200, login);
  } catch (error) {
    handleControllerError(res, error);
  }
};
