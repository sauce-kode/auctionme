import {
  forgotPasswordInput,
  loginInput,
  verifyresetPasswordOtpInput,
  signupInput,
  resetPasswordInput,
} from "../validation";
import { createUser, getUserByEmail } from "../../user/repositories";
import { UserResponse } from "../../user/type";
import {
  compareHash,
  delCache,
  generateHash,
  getCache,
  randomCode,
  setCache,
  transport,
} from "../../../utils";
import jwt from "jsonwebtoken";
import { env } from "../../../config";
import { TokenPayload } from "../types";
import { createRefrehToken } from "../repositories";

const FORGOT_PASSWORD_CACHE_PREFIX = "forgot-password-otp";

export async function userSignup(data: signupInput): Promise<UserResponse> {
  // check if user exists
  const user = await getUserByEmail(data.email);

  if (Boolean(user)) {
    throw new Error("User already exists");
  }

  const hashedPassword = await generateHash(data.password);
  data.password = hashedPassword;
  const createdUser = await createUser(data);

  //TODO: send welcome email

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

export async function userforgotPassword(data: forgotPasswordInput) {
  const user = await getUserByEmail(data.email);

  if (!user) {
    return;
  }

  const otp = randomCode();
  const cacheKey = `${FORGOT_PASSWORD_CACHE_PREFIX}-${user.email}`;
  const hashedOtp = await generateHash(String(otp));
  // save hashed otp in redis
  setCache(cacheKey, hashedOtp, 5 * 60 * 60);
  //TODO: use queues instead
  transport.sendMail({
    from: `${env.EMAIL_SENDER} '<${env.EMAIL_FROM}>'`, //"Example app <no-reply@example.com>",
    to: user.email,
    subject: "You forgot your auctionme password",
    text: `Hello ${user.first_name} \n Use this OTP to verify your password reset ${otp}`,
  });
  return;
}

export async function userVerifyResetPasswordOtp(
  data: verifyresetPasswordOtpInput
): Promise<boolean> {
  const errMsg = "Invalid or expired OTP";
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new Error(errMsg);
  }
  const cacheKey = `${FORGOT_PASSWORD_CACHE_PREFIX}-${user.email}`;
  const cachedOtp = await getCache(cacheKey);
  if (!cachedOtp) throw new Error(errMsg);
  const validHash = await compareHash(data.otp, cachedOtp);

  if (!validHash) throw new Error(errMsg);
  await delCache(cacheKey);
  return true;
}

export async function userResetPassword(data: resetPasswordInput) {}

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
