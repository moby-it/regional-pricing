import { bootstrap } from './bootstrap.mjs';
import { fetchCountry } from './fetchCountry.mjs';
import { searchCached, cacheCoordinates } from './db/db.mjs';

const app = await bootstrap();

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
// 38.44581189757543, 27.143919872818454