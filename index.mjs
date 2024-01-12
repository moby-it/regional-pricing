import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { fetchCountry } from './fetchCountry.mjs';
configDotenv();

const app = express();

app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});

app.get('/location', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).send('No coordinates were provided!');
        }
        const country = await fetchCountry(lat, lon);
        return res.send(country);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
