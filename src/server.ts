import { env } from "./config";
import { createApp } from "./app";
import { logger } from "./utils";
import { pool } from "./db";

const app = createApp();
const server = app.listen(env.APP_PORT, () => {
  logger.info({ port: env.APP_PORT }, "auctionme backend server started");
});

async function shutdown(signal: string) {
  logger.info({ signal }, "auctionme backend server shutting down");
  server.close(async () => {
    try {
      await pool.end();
    } finally {
      process.exit(0);
    }
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
