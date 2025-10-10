import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

const envSchema = cleanEnv(process.env, {
  APP_ENV: str({ choices: ["development", "staging", "production"] }),
  APP_PORT: num({ default: 3000 }),
  DB_URL: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_ACCESS_EXPIRES: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_EXPIRES: str(),
  REDIS_URL: str(),
  EMAIL_FROM: str(),
  EMAIL_SENDER: str(),
  MAILTRAP_HOST: str(),
  MAILTRAP_USER: str(),
  MAILTRAP_PASSWORD: str(),
  MAILTRAP_PORT: num(),
});

export const env = envSchema;
