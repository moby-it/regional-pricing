import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';

import { seedPrices } from './default-prices/default-prices.mjs';
import { logger } from './logger/logger.mjs';
import { getMetrics } from './metrics/metrics.mjs';
import { createRedisClient } from './redis/client.mjs';

import { seedPriceWeights } from './price-weights/price-weights.mjs';

import regionalPricesRouter from './routes/regional-price.route.mjs';
configDotenv();
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(validateClient);
await seedPriceWeights();
await seedPrices();

app.use('/regionalPrices', regionalPricesRouter);
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
}

function validateClient(req, res, next) {
    const apiKey = process.env['APIKEY'] || '';
    if (!apiKey) next();
    else if (apiKey === req.headers['x-api-key']) next();
    else res.sendStatus(403);
}