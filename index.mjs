import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { seedDatabase } from './db/seedDatabase.mjs';

import locationRouter from './routes/location.route.mjs';
import initPriceRouter from './routes/initial_price.routes.mjs';
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