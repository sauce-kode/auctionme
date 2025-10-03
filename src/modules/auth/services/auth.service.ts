import { signupInput } from "../validation";
import { createUser } from "../../user/repositories";
import { UserResponse } from "../../user/type";
import { generateHash } from "../../../utils";

export async function userSignup(data: signupInput): Promise<UserResponse> {
  try {
    const hashedPassword = await generateHash(data.password);
    data.password = hashedPassword;
    const createdUser = await createUser(data);

    // send welcome email
    const { password, created_at, updated_at, ...userRes } = createdUser;
    return userRes;
  } catch (error) {
    throw error;
  }
}
