import { pinoHttp } from "pino-http";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(pinoHttp({}));

  return app;
}
