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

app.get('/location', (req, res) => {
    res.send('works');
})