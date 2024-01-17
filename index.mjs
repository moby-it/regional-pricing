import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { fetchByIp } from './country/getByIp.mjs';
import { fetchByLatLon } from './country/getByLatLon.mjs';
import { seedDatabase } from './db/db.mjs';
configDotenv();

configDotenv();
const port = process.env.PORT || 8080;
const app = express();
await seedDatabase();

app.use(cors());

app.get('/location', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).send('No coordinates were provided!');
        }
        // @ts-ignore
        const country = await fetchByLatLon(lat, lon);
        return res.send(country);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/countryByIp', async (req, res) => {
    try {
        const ip = req.headers.forwarded;
        if (!ip)
            return res.status(400).send({ message: "ip missing from headers" });
        const country = await fetchByIp(ip);
        return res.send(country);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});