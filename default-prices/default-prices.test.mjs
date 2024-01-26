import assert from "node:assert";
import { describe, it } from "node:test";
import { defaultPrices, seedPrices } from "./default-prices.mjs";

describe('Test Default Prices', () => {
  it('should popular the default prices from csv', async () => {
    await seedPrices('default_prices.example.csv');
    assert.equal(defaultPrices.length, 3);
    assert.equal(defaultPrices[0].Service_Name, "Consulting & Analysis");
    assert.equal(defaultPrices[1].Service_Name, "Design & Development");
    assert.equal(defaultPrices[2].Service_Name, "Development Support");
    assert.equal(defaultPrices[0].Cost, "2000");
    assert.equal(defaultPrices[1].Cost, "8500");
    assert.equal(defaultPrices[2].Cost, "6200");
  });
});