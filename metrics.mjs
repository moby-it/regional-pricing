
const metrics = ['cacheHit', 'cacheMiss'];

/**
 * @param {'cacheHit' | 'cacheMiss'} prop
 * @param {import("@redis/client").RedisClientType<any, any, any>} client
 */
export async function incrMetric(prop, client) {
  await client.incr(prop);
}
/**
 * 
 * @param {import("@redis/client").RedisClientType<any, any, any>} client
 * @returns 
 */
export async function getMetrics(client) {
  const metricValues = {};
  for (const metric of metrics) {
    const v = await client.get(metric);
    metricValues[metric] = v;
  }
  return metricValues;
}