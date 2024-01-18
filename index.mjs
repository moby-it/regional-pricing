import { cacheCoordinates, searchCached } from './db/db.mjs';
import { fetchCountry } from './fetchCountry.mjs';
import { configDotenv } from 'dotenv';
import { seedDatabase } from './db/db.mjs';
import cors from 'cors';
import express from 'express';

configDotenv();
const port = process.env.PORT || 8080;
const app = express();
await seedDatabase();

app.use(cors());

app.get('/location', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).send('No coordinates were provided!');
        let country = await searchCached(lat, lon);
        if (country) return res.send(country);
        country = await fetchCountry(lat, lon);
        await cacheCoordinates(lat, lon, country);
        return res.send(country);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});