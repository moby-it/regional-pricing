import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';

import { seedPrices } from './default-prices/default-prices.mjs';
import { logger } from './logger/logger.mjs';
import { getMetrics } from './metrics.mjs';
import { createRedisClient } from './redis/client.mjs';
import locationRouter from './routes/location.route.mjs';
import priceRouter from './routes/price.routes.mjs';

configDotenv();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
seedPrices();

app.use('/price', priceRouter);
app.use('/country', locationRouter);
app.get('/metrics', async (req, res) => {
    try {
        const client = await createRedisClient();
        res.send(await getMetrics(client));
        await client.disconnect();
    } catch (e) {
        logger.error(e);
        res.sendStatus(500);
    }

});

const server = app.listen(port, () => {
    logger.info(`App listening to port ${port}`);
});

process.on('SIGINT', () => {
    logger.info('received SIGINT.');
});
process.on('SIGINT', gracefulClose);
process.on('SIGTERM', () => {
    logger.info('server terminated.');
    process.exit(1);
});

function gracefulClose() {
    server.close(() => { logger.info('HTTP(S) server closed'); });
    setTimeout(() => {
        process.exit(1);
    }, 10000);
}
