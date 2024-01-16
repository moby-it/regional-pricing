import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from 'express';
import { seedDatabase } from './db/db.mjs';

export async function bootstrap() {
    configDotenv();
    const port = process.env.PORT || 8080;
    const app = express();
    await seedDatabase().then(() => {
        app.listen(port, () => {
            console.log(`App listening to port ${port}`);
        });
    })
    app.use(cors());

    return app;
}
