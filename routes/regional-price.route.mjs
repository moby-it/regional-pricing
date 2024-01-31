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
        const IPisLocal = isLocalIP(ip);
        if (!success || IPisLocal) {
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
export function isLocalIP(ip) {
    if (ip === '127.0.0.1') return true;
    const localIPPatterns = [
        /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3})$/, // 10.0.0.0 - 10.255.255.255
        /^(172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})$/, // 172.16.0.0 - 172.31.255.255
        /^(192\.168\.\d{1,3}\.\d{1,3})$/ // 192.168.0.0 - 192.168.255.255
    ];

    return localIPPatterns.some(pattern => pattern.test(ip));
}