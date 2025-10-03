import { userSignup } from "../services";
import { signupSchema } from "../validation";
import { dbToApi } from "../../../utils";
import { Request, Response } from "express";
import z, { success } from "zod";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = signupSchema.parse(req.body);

    const createdUser = await userSignup(validatedData);

    res.status(201).json({
      success: true,
      message: "Signed up successfully",
      data: dbToApi(createdUser),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues,
      });
      return;
    }

    if (error instanceof Error) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
