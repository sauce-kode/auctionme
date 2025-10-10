import z, { email } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string("First name is required")
    .min(1, "First name is required")
    .trim(),
  lastName: z
    .string("Last name is required")
    .min(1, "Last name is required")
    .trim(),
  email: z.email("Enter a valid e-mail address").toLowerCase().trim(),
  password: z
    .string("Enter a strong pasword")
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.email("Enter your valid e-mail address").toLowerCase().trim(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Enter your valid e-mail address").toLowerCase().trim(),
});

export const verifyResetPasswordOtpSchema = z.object({
  email: z.email("Enter your valid e-mail address").toLowerCase().trim(),
  otp: z.string("OTP is required").length(6, "OTP must be 6 characters"),
});

export const resetPasswordSchema = z.object({
  email: z.email("Enter your valid e-mail address").toLowerCase().trim(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type signupInput = z.infer<typeof signupSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type verifyresetPasswordOtpInput = z.infer<
  typeof verifyResetPasswordOtpSchema
>;
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;
