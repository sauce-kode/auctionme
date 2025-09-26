import { env } from "../config";
import pino from "pino";

export const logger = pino({
  level: env.APP_ENV === "production" ? "info" : "debug",
  transport:
    env.APP_ENV === "production"
      ? undefined
      : { target: "pino-pretty", options: { colorize: true } },
});
