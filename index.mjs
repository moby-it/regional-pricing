import { bootstrap } from './bootstrap.mjs';
import { fetchCountry } from './fetchCountry.mjs';




const port = process.env.PORT || 8080;

const app = await bootstrap();

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
