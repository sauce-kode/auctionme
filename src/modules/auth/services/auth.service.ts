import { loginInput, signupInput } from "../validation";
import { createUser, getUserByEmail } from "../../user/repositories";
import { UserResponse } from "../../user/type";
import { compareHash, generateHash } from "../../../utils";
import jwt from "jsonwebtoken";
import { env } from "../../../config";
import { TokenPayload } from "../types";
import { createRefrehToken } from "@/modules/auth/repositories";

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
  const payload: TokenPayload = {
    email: user.email,
    userId: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
  };
  const { accessToken, refreshToken } = await generateAuthTokens(payload);
  const { password, created_at, updated_at, ...userRes } = user;
  return {
    user: userRes,
    accessToken,
    refreshToken,
  };
}

async function generateAuthTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = await generateRefreshToken(payload.userId);
  return { accessToken, refreshToken };
}

async function generateRefreshToken(userId: string) {
  const refreshToken = jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: "24h",
  });

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const record = await createRefrehToken({
    userId,
    token: refreshToken,
    expiresAt,
  });
  return refreshToken;
}
