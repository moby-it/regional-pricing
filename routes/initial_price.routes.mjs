import express from "express";
import { selectQuery } from "../db/db.mjs";
const initPriceRouter = express.Router();

initPriceRouter.get('/', async (req, res) => {
    try {
        const sql = ` SELECT * FROM defaultPrices`;
        const result = await selectQuery(sql);
        return res.send(result);
    } catch (error) {
        return res.send(error);
    }
});

export default initPriceRouter;