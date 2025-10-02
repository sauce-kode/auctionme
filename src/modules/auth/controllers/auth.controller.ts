import { userSignup } from "@/modules/auth/services";
import { signupSchema } from "@/modules/auth/validation";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);

  const createdUser = await userSignup(validatedData);

  res.status(201).json({
    success: true,
    message: "Signed up successfully",
    data: createdUser,
  });
};
