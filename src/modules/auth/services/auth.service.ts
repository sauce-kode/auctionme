import { signupInput } from "../validation";
import { createUser, getUserByEmail } from "../../user/repositories";
import { UserResponse } from "../../user/type";
import { generateHash } from "../../../utils";

export async function userSignup(data: signupInput): Promise<UserResponse> {
  // check if user exists
  const user = await getUserByEmail(data.email);

  if (Boolean(user)) {
    throw new Error("User already exists");
  }

  const hashedPassword = await generateHash(data.password);
  data.password = hashedPassword;
  const createdUser = await createUser(data);

  // send welcome email
  const { password, created_at, updated_at, ...userRes } = createdUser;
  return userRes;
}
