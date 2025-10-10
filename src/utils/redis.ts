import { logger } from "../utils";
import { getRedisClient } from "../config";

export async function setCache(
  key: string,
  value: string,
  ttl?: number
): Promise<boolean> {
  const client = getRedisClient();
  if (!client) return false;

  try {
    if (ttl) {
      await client.setEx(key, ttl, value);
    } else {
      await client.set(key, value);
    }
    return true;
  } catch (error: any) {
    logger.error(`Redis set failed for key ${key}`, error);
    return false;
  }
}

export async function getCache(key: string): Promise<string | null> {
  const client = getRedisClient();
  if (!client) return null;

  try {
    return await client.get(key);
  } catch (error: any) {
    logger.error(`Redis get failed for key ${key}`, error);
    return null;
  }
}

export async function delCache(key: string) {
  const client = getRedisClient();
  if (!client) return false;

  try {
    return client.del(key);
  } catch (error: any) {
    logger.error(`Redis delete failed for key ${key}`, error);
    return false;
  }
}
