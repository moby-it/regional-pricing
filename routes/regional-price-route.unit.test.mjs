import assert from "node:assert";
import { before, describe, it } from "node:test";
import { defaultPrices, seedPrices } from "../default-prices/default-prices.mjs";
import { seedPriceWeights } from "../price-weights/price-weights.mjs";
import { getPriceWeight, getRegionalPrices, isLocalIP, } from "./regional-price.route.mjs";

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
describe('Test is Local IP', () => {
    it('should consider 127.0.0.1 as local IP', () => {
        assert.strictEqual(isLocalIP('127.0.0.1'), true);
    });
    it('should consider 10.0.0.1 as local IP', () => {
        assert.strictEqual(isLocalIP('10.0.0.1'), true);
    });
    it('should consider 192.168.0.5 as local IP', () => {
        assert.strictEqual(isLocalIP('192.168.0.5'), true);
    });
    it('should consider 192.168.0.4 as local IP', () => {
        assert.strictEqual(isLocalIP('192.168.0.4'), true);
    });
    it('should consider 8.8.8.8 as NOT local IP', () => {
        assert.strictEqual(isLocalIP('8.8.8.8'), false);
    });
    it('should consider 64.233.191.255 as NOT local IP', () => {
        assert.strictEqual(isLocalIP('64.233.191.255'), false);
    });
    it('should consider 17.172.224.47 as NOT local IP', () => {
        assert.strictEqual(isLocalIP('17.172.224.47'), false);
    });
    it('should consider 13.107.21.200 as NOT local IP', () => {
        assert.strictEqual(isLocalIP('13.107.21.200'), false);
    });
});