import { env } from "../config/env";
import { logger } from "../utils";
import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType | null = null;

export async function initRedis(): Promise<void> {
  try {
    if (redisClient?.isOpen) {
      return;
    }

    redisClient = createClient({
      url: env.REDIS_URL,
    });

    redisClient.on("error", (err) => {
      logger.error("Redis error:", err.message);
    });

    redisClient.on("connect", () => {
      logger.info("Redis connected");
    });

    await redisClient.connect();
  } catch (error: any) {
    logger.error("Redis connection failed:", error);
  }
}

export function getRedisClient(): RedisClientType | null {
  return redisClient?.isOpen ? redisClient : null;
}

export async function closeRedis(): Promise<void> {
  if (redisClient?.isOpen) {
    await redisClient.quit();
    redisClient = null;
    logger.info("Redis disconnected");
  }
}
