import { createClient } from "redis";
import { logger } from "../logger/logger.mjs";

export async function createRedisClient() {
  try {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      logger.warn('failed to get redis url. No cache');
      return;
    }
    const client = await createClient({
      url: redisUrl
    }).connect();
    logger.info('connected to redis');
    return client;
  } catch (e) {
    logger.warn('failed to initialize redis');
    logger.warn('Redis Error: ' + e.message);
    return null;
  }
}
