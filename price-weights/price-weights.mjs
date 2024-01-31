import csvParser from "csv-parser";
import { createReadStream } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';


/**
 * @type {Map<string, number>}
 */
export const priceWeights = new Map();

export function seedPriceWeights(filename) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const csvFilename = filename || 'price_weights.csv';
    const csvFilePath = `${__dirname}/${csvFilename}`;
    return new Promise((res) => {
        createReadStream(csvFilePath).pipe(csvParser())
            .on('data', row => {
                priceWeights.set(row.Country, row.price_weight);
            }).on('end', () => {
                res();
            });
    });
}

