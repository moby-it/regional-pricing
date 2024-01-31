import assert from "node:assert";
import { describe, it } from "node:test";
import { getPriceWeight, getRegionalPrices } from "./regional-price.route.mjs";

describe('Test getPriceWeight', () => {
    it('should be given a country and return a corresponding price weight if exists. If not it returns 1', async () => {
        assert.equal(getPriceWeight("Greece"), 0.75);
        assert.equal(getPriceWeight("Croatia"), 0.7);
        assert.equal(getPriceWeight("Cyprus"), 0.8);
        assert.equal(getPriceWeight("Estonia"), 0.8);
        assert.equal(getPriceWeight("Italy"), 0.85);
        assert.equal(getPriceWeight("Hungary"), 0.7);
        assert.equal(getPriceWeight("Latvia"), 0.75);
        assert.equal(getPriceWeight("Lithuania"), 0.7);
        assert.equal(getPriceWeight("Portugal"), 0.75);
        assert.equal(getPriceWeight("Romania"), 0.7);
        assert.equal(getPriceWeight("Slovenia"), 0.75);
        assert.equal(getPriceWeight("Slovakia"), 0.75);
        assert.equal(getPriceWeight("Spain"), 0.85);
        assert.equal(getPriceWeight("Turkey"), 0.7);
        assert.equal(getPriceWeight("France"), 1);
    });
});
describe('Test  getRegionalPrices', () => {
    it('should be given a priceWeight and return the correct service costs', async () => {
        assert.equal(getRegionalPrices(1).length, 3)
        assert.equal(getRegionalPrices(0.7)[0].Cost, 1400);
        assert.equal(getRegionalPrices(0.7)[1].Cost, 5950);
        assert.equal(getRegionalPrices(0.7)[2].Cost, 4340);
        assert.equal(getRegionalPrices(0.75)[0].Cost, 1500);
        assert.equal(getRegionalPrices(0.75)[1].Cost, 6375);
        assert.equal(getRegionalPrices(0.75)[2].Cost, 4650);
        assert.equal(getRegionalPrices(0.8)[0].Cost, 1600);
        assert.equal(getRegionalPrices(0.8)[1].Cost, 6800);
        assert.equal(getRegionalPrices(0.8)[2].Cost, 4960);
        assert.equal(getRegionalPrices(0.85)[0].Cost, 1700);
        assert.equal(getRegionalPrices(0.85)[1].Cost, 7225);
        assert.equal(getRegionalPrices(0.85)[2].Cost, 7250);
    });
});