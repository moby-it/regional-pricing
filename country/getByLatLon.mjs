import axios from "axios";
import * as v from 'valibot';
import { logger } from "../logger/logger.mjs";

function getCountryByLatLonApiUrl(lat, lon) {
  return `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=3&format=jsonv2&accept-language=en`;
}

/**
 * 
 * @param {string} lat 
 * @param {string} lon 
 * @returns {Promise<{country:string, cached:boolean}>}
 */
export async function fetchByLatLon(lat, lon) {
  // const cached = await searchCached(lat, lon);
  const cached = false;
  if (cached) {
    return {
      country: cached,
      cached: true
    };
  } else {
    const res = await axios.get(getCountryByLatLonApiUrl(lat, lon));
    if (res.status !== 200) return;
    const addressSchema = v.object({
      country: v.string()
    });
    const responseSchema = v.object({
      address: addressSchema
    });
    const valiRes = v.safeParse(responseSchema, res.data);

    if (valiRes.success)
      return {
        country: valiRes.output.address.country,
        cached: !!cached
      };
    else {
      logger.error("schema validation failed", valiRes.issues);
      return;
    }
  }
};