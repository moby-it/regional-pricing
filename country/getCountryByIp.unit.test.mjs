import assert from "node:assert";
import { describe, it } from "node:test";
import { fetchByIp } from "./getByIp.mjs";

describe('TEST: Get by IP', async () => {
  const greekIP = "31.217.163.2";
  const UnitedStatesIP = "66.241.124.78";
  const NetherlandsIP = "169.150.218.68";
  it(`should get Greece for ${greekIP}`, async () => {
    const country = await fetchByIp(greekIP);
    assert.equal(country, "Greece");
  });
  it(`should get US for ${UnitedStatesIP}`, async () => {
    const country = await fetchByIp(UnitedStatesIP);
    assert.equal(country, "United States");
  });
  it(`should get The Netherlands for ${NetherlandsIP}`, async () => {
    const country = await fetchByIp(NetherlandsIP);
    assert.equal(country, "The Netherlands");
  });
});