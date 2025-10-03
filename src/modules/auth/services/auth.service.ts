import { loginInput, signupInput } from "../validation";
import { createUser, getUserByEmail } from "../../user/repositories";
import { UserResponse } from "../../user/type";
import { compareHash, generateHash } from "../../../utils";
import jwt from "jsonwebtoken";
import { env } from "../../../config";

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

export async function userLogin(data: loginInput) {
  const errMsg = "Invalid login details";

  const user = await getUserByEmail(data.email);

  if (!user) {
    throw new Error(errMsg);
  }

  const passwordMatches = compareHash(data.password, user.password);

  if (!passwordMatches) {
    throw new Error(errMsg);
  }
  const tokenPayload = { email: user.email, id: user.id };
  const token = jwt.sign(tokenPayload, env.JWT_SECRET, {
    expiresIn: "24h",
  });

  const { password, created_at, updated_at, ...userRes } = user;
  return {
    userRes,
    token,
  };
}
