import csvParser from "csv-parser";
import { createReadStream } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @typedef RegionalWeight
 * @property {string} Country
 * @property {string} Code
 * * @property {string} priceWeight
*/

/**
 * @type {RegionalWeight[]}
 */
export const priceWeights = [];

export function seedPriceWeights() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const cvsFilePath = `${__dirname}/price_weights.csv`;
    return new Promise((res) => {
        createReadStream(cvsFilePath).pipe(csvParser())
            .on('data', row => {
                priceWeights.push(row);
            }).on('end', () => {
                res();
            });
    });
}

