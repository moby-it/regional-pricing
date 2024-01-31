import express from "express";
import { fetchByIp } from "../country/getByIp.mjs";
import * as v from 'valibot';
import { logger } from "../logger/logger.mjs";
import { priceWeights } from "../price-weights/price-weights.mjs";
import { defaultPrices } from "../default-prices/default-prices.mjs";
const regionalPriceRouter = express.Router();

regionalPriceRouter.get('/', async (req, res) => {
    try {
        const ipHeader = req.headers['ip-origin'];
        const { success, output: ip } = v.safeParse(v.string([v.minLength(9)]), ipHeader);
        if (!success) {
            return res.status(400).send({ message: "incorrect ip provided" });
        }
        const country = await fetchByIp(ip);
        const priceWeight = checkForPriceWeight(country)
        if (priceWeight === 1) {
            return res.send({ country, defaultPrices });
        }
        const regionalPrices = getRegionalPrices(priceWeight);
        return res.send({ country, defaultPrices, regionalPrices });
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});
export default regionalPriceRouter;

function checkForPriceWeight(country) {
    let appliedPriceWeigth = 1;
    for (const priceWeight of priceWeights) {
        if (country === priceWeight.Country) {
            appliedPriceWeigth = priceWeight.priceWeight;
        }
    }
    return appliedPriceWeigth;
}

function getRegionalPrices(priceWeight) {
    const regionalPrices = [];
    for (const defaultPrice of defaultPrices) {
        regionalPrices.push({
            ...defaultPrice,
            Cost: defaultPrice.Cost * priceWeight
        })
    }
}