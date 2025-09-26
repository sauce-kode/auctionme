import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

const envSchema = cleanEnv(process.env, {
  APP_ENV: str({ choices: ["development", "staging", "production"] }),
  APP_PORT: num({ default: 3000 }),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_PORT: num(),
  DB_NAME: str(),
  DB_HOST: str(),
  DB_URL: str(),
});

export const env = envSchema;
