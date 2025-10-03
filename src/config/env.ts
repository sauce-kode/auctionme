import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

const envSchema = cleanEnv(process.env, {
  APP_ENV: str({ choices: ["development", "staging", "production"] }),
  APP_PORT: num({ default: 3000 }),
  DB_URL: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES: str(),
});

export const env = envSchema;
