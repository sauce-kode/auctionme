import { signupInput } from "@/modules/auth/validation";
import { createUser } from "@/modules/user/repositories";
import { UserResponse } from "@/modules/user/type";
import { generateHash } from "@/utils";

export async function userSignup(data: signupInput): Promise<UserResponse> {
  try {
    const hashedPassword = await generateHash(data.password);
    const createdUser = await createUser({ ...data, hashedPassword });
    // send welcome email

    const { password, ...userRes } = createdUser;
    return userRes;
  } catch (error) {
    throw error;
  }
}
