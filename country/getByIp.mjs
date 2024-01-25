import axios from "axios";
import * as v from 'valibot';
import { logger } from "../logger/logger.mjs";

/**
 * @param {string} ip
 */
function getCountryByIPApiUrl(ip) {
  if (!ip) {
    logger.error('no ip provided');
  }
  return `http://ip-api.com/json/${ip}?fields=49155`;
}

/**
 * 
 * @param {string} ip
 * @returns {Promise<string | undefined>}
 */
export async function fetchByIp(ip) {
async function getCountryByIP(ip, redis) {
  logger.info('getting country for ip ' + ip);
  const res = await axios.get(getCountryByIPApiUrl(ip));
  if (res.status !== 200 || res?.data?.status === 'fail') {
    logger.error(JSON.stringify(res.data));
    throw res.data;
  }
  const schema = v.object({
    status: v.string(),
    country: v.string(),
    countryCode: v.string()
  });
  const valiRes = v.safeParse(schema, res.data);
  if (valiRes.success)
    return valiRes.output.country;
  else {
    logger.error("schema validation failed", valiRes.issues);
    return;
  }
};