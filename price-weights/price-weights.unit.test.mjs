import assert from "node:assert";
import { before, describe, it } from "node:test";
import { priceWeights, seedPriceWeights } from "./price-weights.mjs";

describe('Test Seed Price Weights', () => {
    before(async () => {
        await seedPriceWeights('price_weights.example.csv');
    });
    it('should populate price-weights with appropriate counties-weight value', () => {
        assert.equal(Array.from(priceWeights.entries()).length, 14);
        assert.equal(priceWeights.get("Greece"), 0.75);
        assert.equal(priceWeights.get("Croatia"), 0.7);
        assert.equal(priceWeights.get("Cyprus"), 0.8);
        assert.equal(priceWeights.get("Estonia"), 0.8);
        assert.equal(priceWeights.get("Italy"), 0.85);
        assert.equal(priceWeights.get("Hungary"), 0.7);
        assert.equal(priceWeights.get("Latvia"), 0.75);
        assert.equal(priceWeights.get("Lithuania"), 0.7);
        assert.equal(priceWeights.get("Portugal"), 0.75);
        assert.equal(priceWeights.get("Romania"), 0.7);
        assert.equal(priceWeights.get("Slovenia"), 0.75);
        assert.equal(priceWeights.get("Slovakia"), 0.75);
        assert.equal(priceWeights.get("Spain"), 0.85);
        assert.equal(priceWeights.get("Turkey"), 0.7);
    });
});



