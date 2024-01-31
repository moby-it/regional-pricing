import assert from "node:assert";
import { describe, it } from "node:test";
import { priceWeights, seedPriceWeights } from "./price-weights.mjs";
5
describe('Test Price Weights', () => {
    it('should populate the countries with the corresponding price-weights from csv', async () => {
        await seedPriceWeights('price_weights.example.csv');
        assert.equal(priceWeights.length, 14);
        assert.equal(priceWeights[0].Country, "Greece");
        assert.equal(priceWeights[1].Country, "Croatia");
        assert.equal(priceWeights[2].Country, "Cyprus");
        assert.equal(priceWeights[3].Country, "Estonia");
        assert.equal(priceWeights[4].Country, "Italy");
        assert.equal(priceWeights[5].Country, "Hungary");
        assert.equal(priceWeights[6].Country, "Latvia");
        assert.equal(priceWeights[7].Country, "Lithuania");
        assert.equal(priceWeights[8].Country, "Portugal");
        assert.equal(priceWeights[9].Country, "Romania");
        assert.equal(priceWeights[10].Country, "Slovenia");
        assert.equal(priceWeights[11].Country, "Slovakia");
        assert.equal(priceWeights[12].Country, "Spain");
        assert.equal(priceWeights[13].Country, "Turkey");
        assert.equal(priceWeights[0].price_weight, 0.75);
        assert.equal(priceWeights[1].price_weight, 0.7);
        assert.equal(priceWeights[2].price_weight, 0.8);
        assert.equal(priceWeights[3].price_weight, 0.8);
        assert.equal(priceWeights[4].price_weight, 0.85);
        assert.equal(priceWeights[5].price_weight, 0.7);
        assert.equal(priceWeights[6].price_weight, 0.75);
        assert.equal(priceWeights[7].price_weight, 0.7);
        assert.equal(priceWeights[8].price_weight, 0.75);
        assert.equal(priceWeights[9].price_weight, 0.7);
        assert.equal(priceWeights[10].price_weight, 0.75);
        assert.equal(priceWeights[11].price_weight, 0.75);
        assert.equal(priceWeights[12].price_weight, 0.85);
        assert.equal(priceWeights[13].price_weight, 0.7);
    });
});
