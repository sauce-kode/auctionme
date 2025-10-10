import { env } from "../config";
import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: env.MAILTRAP_HOST,
  port: env.MAILTRAP_PORT,
  secure: env.MAILTRAP_PORT === 465, // true for 465, false for other ports
  auth: {
    user: env.MAILTRAP_USER,
    pass: env.MAILTRAP_PASSWORD,
  },
});
