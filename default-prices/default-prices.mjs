import csvParser from "csv-parser";
import { createReadStream } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * @typedef Price
 * @property {string} Service_Name
 * @property {string} Cost
*/

/**
 * @type {Price[]}
 */
export const defaultPrices = [];

export function seedPrices() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const cvsFilePath = `${__dirname}/default_prices.csv`;
  createReadStream(cvsFilePath).pipe(csvParser()).on('data', async (row) => {
    defaultPrices.push(row);
  });
}

