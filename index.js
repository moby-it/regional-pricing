import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import axios from 'axios';
configDotenv();

const app = express();
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`)
});

app.get('/location', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.send('No coordinates were provided!');
    }
    const country = await axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=3&format=jsonv2&accept-language=en`).then(data => data.data.address.country);
    return res.send(country);
});