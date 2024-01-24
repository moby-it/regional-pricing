import express from "express";
import { selectQuery } from "../db/db.mjs";
const priceRouter = express.Router();

priceRouter.get('/default', async (req, res) => {
    try {
        const sql = ` SELECT * FROM defaultPrices`;
        const result = await selectQuery(sql);
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
});

export default priceRouter;