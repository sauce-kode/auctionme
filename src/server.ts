import { closeRedis, env } from "./config";
import { createApp } from "./app";
import { logger } from "./utils";
import { pool } from "./db";

async function startServer() {
  const app = await createApp();

  return app.listen(env.APP_PORT, () => {
    logger.info({ port: env.APP_PORT }, "auctionme backend server started");
  });
}

const server = startServer();

async function shutdown(signal: string) {
  logger.info({ signal }, "auctionme backend server shutting down");

  try {
    const serverInstance = await server;
    serverInstance.close(async () => {
      try {
        await pool.end();

        await closeRedis();
      } finally {
        process.exit(0);
      }
    });
  } catch (error: any) {
    logger.error(" Error shutting down server", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
