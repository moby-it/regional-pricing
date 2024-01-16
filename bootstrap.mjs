import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { seedDatabase } from './db/db.mjs';

export async function bootstrap() {
    configDotenv();
    const app = express();

    await seedDatabase();

    app.use(cors());

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
        console.log(`App listening to port ${port}`);
    });
    return app;
}
