import axios from "axios";
import * as v from 'valibot';
import { createRedisClient } from "../redis/client.mjs";
import { incrMetric } from "../metrics/metrics.mjs";
import { logger } from "../logger/logger.mjs";

/**
 * @param {string} ip
 */
function getCountryByIPApiUrl(ip) {
  if (!ip) {
    logger.error('no ip provided');
  }
  return `http://ip-api.com/json/${ip}?fields=16385`;
}

/**
 * 
 * @param {string} ip
 * @returns {Promise<string | undefined>}
 */
export async function fetchByIp(ip) {
  const redis = await createRedisClient();
  let country;
  if (!redis) {
    return await getCountryByIP(ip, null);
  }
  try {
    country = await redis.get(ip);
    if (country) {
      await incrMetric('cacheHit', redis);
      return country;
    }
    await incrMetric('cacheMiss', redis);
    country = await getCountryByIP(ip, redis);
    return country;
  } catch (e) {
    logger.error(e);
    return null;
  } finally {
    await redis.disconnect();
  }
}

async function getCountryByIP(ip, redis) {
  logger.info('getting country for ip ' + ip);
  const res = await axios.get(getCountryByIPApiUrl(ip));
  if (res.status !== 200 || res?.data?.status === 'fail') {
    logger.error(JSON.stringify(res.data));
    throw res.data;
  }
  const schema = v.object({
    status: v.string(),
    country: v.string()
  });
  const valiRes = v.safeParse(schema, res.data);
  if (valiRes.success) {
    {
      logger.info(`country for ip ${ip} is ${valiRes.output.country}`, { ip, country: valiRes.output.country });
      const ttl = Number(process.env.REDIS_IP_TTL) || 14400; // defaults to 4 hours
      if (redis) { await redis.set(ip, valiRes.output.country, { EX: ttl }); }
      return valiRes.output.country;
    }
  }
  else {
    logger.error("schema validation failed", valiRes.issues);
    return;
  }
}