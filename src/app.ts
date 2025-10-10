import { logger } from "./utils/logger.util";
import { pinoHttp } from "pino-http";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import { authRoutes } from "./modules/auth";
import { initRedis } from "./config";

export async function createApp() {
  const app = express();

  const basePath = `/api/v1`;

  await initRedis();

  app.use(helmet());
  app.use(compression());
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(pinoHttp({ logger }));

  app.use(`${basePath}/auth`, authRoutes);

  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: "Route not found on this server",
    });
  });

  return app;
}
