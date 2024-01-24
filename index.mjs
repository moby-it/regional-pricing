import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { fetchByIp } from './country/getByIp.mjs';
import { fetchByLatLon } from './country/getByLatLon.mjs';
import { seedDatabase } from './db/seedDatabase.mjs';
import * as v from 'valibot';
import initPriceRouter from './routes/initial_price.route.mjs';
import locationRouter from './routes/location.route.mjs';
configDotenv();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
await seedDatabase();
app.use('/initialPrices', initPriceRouter);
app.use('/country', locationRouter)

app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});