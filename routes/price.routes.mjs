import express from "express";
import { defaultPrices } from "../default-prices/default-prices.mjs";
const priceRouter = express.Router();

priceRouter.get('/default', async (req, res) => {
    try {
        return res.send(defaultPrices);
    } catch (error) {
        return res.send(error);
    }
});

export default priceRouter;