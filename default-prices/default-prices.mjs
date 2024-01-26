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

/**
 * 
 * @param {string} [filename] Parse csv filename, if present. Otherwise parse `default_prices.csv`
 * @returns 
 */
export function seedPrices(filename) {
  return new Promise((res) => {
    const csvFilename = filename || 'default_prices.csv';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const cvsFilePath = `${__dirname}/${csvFilename}`;
    createReadStream(cvsFilePath).pipe(csvParser())
      .on('data', async (row) => {
        defaultPrices.push(row);
      })
      .on('end', () => { res(); })
      ;

  });
}

