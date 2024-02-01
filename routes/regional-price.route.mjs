import express from "express";
import { fetchByIp } from "../country/getByIp.mjs";
import * as v from 'valibot';
import { logger } from "../logger/logger.mjs";
import { priceWeights } from "../price-weights/price-weights.mjs";
import { defaultPrices } from "../default-prices/default-prices.mjs";
const regionalPricesRouter = express.Router();

regionalPricesRouter.get('/', async (req, res) => {
    try {
        const ipHeader = req.headers['ip-origin'];
        const { success, output: ip } = v.safeParse(v.string([v.minLength(9)]), ipHeader);
        if (!success) {
            return res.status(400).send({ message: "incorrect ip provided" });
        }
        const country = await fetchByIp(ip);
        const priceWeight = getPriceWeight(country);
        if (priceWeight === 1) {
            return res.send({ country, defaultPrices });
        }
        const regionalPrices = getRegionalPrices(priceWeight)
            .map((rp) => ({ ...rp, Cost: +rp.Cost.toFixed(2) }));
        return res.send({ country, defaultPrices, regionalPrices });
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});
export default regionalPricesRouter;

export function getPriceWeight(country) {
    return priceWeights.get(country) || 1;
}

export function getRegionalPrices(priceWeight) {
    const regionalPrices = [];
    for (const defaultPrice of defaultPrices) {
        regionalPrices.push({
            ...defaultPrice,
            Cost: defaultPrice.Cost * priceWeight
        });
    }
    return regionalPrices;
}