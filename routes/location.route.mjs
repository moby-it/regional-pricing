import express from "express";
import { fetchByIp } from "../country/getByIp.mjs";
import * as v from 'valibot';
import { fetchByLatLon } from "../country/getByLatLon.mjs";
import { logger } from "../logger/logger.mjs";
const locationRouter = express.Router();

locationRouter.get('/byCoordinates', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).send('No coordinates were provided!');
        }
        // @ts-ignore
        const country = await fetchByLatLon(lat, lon);
        return res.send(country);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});
locationRouter.get('/byIp', async (req, res) => {
    try {
        const ipHeader = req.headers['x-forwarded-for'];
        const { success, output: ip } = v.safeParse(v.string([v.minLength(9)]), ipHeader);
        if (!success) {
            return res.status(400).send({ message: "incorrect ip provided" });
        }
        const country = await fetchByIp(ip);
        logger.info('country found ' + country)
        return res.send(country);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});

export default locationRouter;