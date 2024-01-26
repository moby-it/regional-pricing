import assert from "assert";
import { before, after, describe, it } from "node:test";
import { getMetrics } from "../metrics.mjs";
import { createRedisClient } from "../redis/client.mjs";
import { fetchByIp } from "./getByIp.mjs";

describe('Redis - Get By IP', async () => {
  const greekIP = "31.217.163.2";
  const UnitedStatesIP = "66.241.124.78";
  const NetherlandsIP = "169.150.218.68";
  let client;
  before(async () => {
    client = await createRedisClient();
    await client.flushAll();
  });
  after(async () => {
    await client.disconnect();
  });
  it(`should have null cache misses`, async () => {
    const metrics = await getMetrics(client);
    assert.equal(metrics.cacheMiss, null);
  });
  it(`should cache ${greekIP}`, async () => {
    const metrics = await getMetrics(client);
    await fetchByIp(greekIP);
    await fetchByIp(greekIP);
    const updatedMetrics = await getMetrics(client);
    assert.equal(+metrics.cacheHit + 1, updatedMetrics.cacheHit);
    assert.equal(metrics.cacheMiss + 1, updatedMetrics.cacheMiss);
  });
  it(`should cache ${UnitedStatesIP}`, async () => {
    const metrics = await getMetrics(client);
    await fetchByIp(UnitedStatesIP);
    await fetchByIp(UnitedStatesIP);
    const updatedMetrics = await getMetrics(client);
    assert.equal(+metrics.cacheHit + 1, updatedMetrics.cacheHit);
    assert.equal(+metrics.cacheMiss + 1, +updatedMetrics.cacheMiss);
  });
  it(`should cache ${NetherlandsIP}`, async () => {
    const metrics = await getMetrics(client);
    await fetchByIp(NetherlandsIP);
    await fetchByIp(NetherlandsIP);
    const updatedMetrics = await getMetrics(client);
    assert.equal(+metrics.cacheHit + 1, updatedMetrics.cacheHit);
    assert.equal(+metrics.cacheMiss + 1, +updatedMetrics.cacheMiss);
  });
});