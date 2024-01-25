import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { seedDatabase } from './db/seedDatabase.mjs';

import locationRouter from './routes/location.route.mjs';
import priceRouter from './routes/price.routes.mjs';
configDotenv();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
await seedDatabase();
app.use('/price', priceRouter);
const server = app.listen(port, () => {
    logger.info(`App listening to port ${port}`);
});

