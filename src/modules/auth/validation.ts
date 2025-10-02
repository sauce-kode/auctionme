import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.email("Enter a valid e-mail address").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type signupInput = z.infer<typeof signupSchema>;
