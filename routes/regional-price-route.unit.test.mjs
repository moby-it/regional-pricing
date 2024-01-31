import assert from "node:assert";
import { before, describe, it } from "node:test";
import { defaultPrices, seedPrices } from "../default-prices/default-prices.mjs";
import { seedPriceWeights } from "../price-weights/price-weights.mjs";
import { getPriceWeight, getRegionalPrices } from "./regional-price.route.mjs";

describe('Test price weights per country', () => {
    before(async () => {
        await seedPrices('default_prices.example.csv');
        await seedPriceWeights('price_weights.example.csv');
    });
    it('should return a cheaper price for Greece', () => {
        const weight = getPriceWeight('Greece');
        const prices = getRegionalPrices(weight);
        assert.ok(weight < 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
    it('should return a cheaper price for Croatia', () => {
        const weight = getPriceWeight('Croatia');
        const prices = getRegionalPrices(weight);
        assert.ok(weight < 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
    it('should return a cheaper price for Estonia', () => {
        const weight = getPriceWeight('Estonia');
        const prices = getRegionalPrices(weight);
        assert.ok(weight < 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
    it('should return a normal price for Germany', () => {
        const weight = getPriceWeight('Germany');
        const prices = getRegionalPrices(weight);
        assert.equal(weight, 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
    it('should return a the normal price for United States', () => {
        const weight = getPriceWeight('United States');
        const prices = getRegionalPrices(weight);
        assert.equal(weight, 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
    it('should return a normal price for France', () => {
        const weight = getPriceWeight('France');
        const prices = getRegionalPrices(weight);
        assert.equal(weight, 1);
        assert.equal(prices[0].Cost, defaultPrices[0].Cost * weight);
        assert.equal(prices[1].Cost, defaultPrices[1].Cost * weight);
        assert.equal(prices[2].Cost, defaultPrices[2].Cost * weight);
    });
});