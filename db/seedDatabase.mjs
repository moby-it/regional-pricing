import { createReadStream } from "fs";
import csvParser from "csv-parser";
import { mutateQuery } from "./db.mjs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cvsFilePath = `${__dirname}/initial_prices.csv`;

export async function seedDatabase() {
  const dropQuery = "DROP TABLE IF EXISTS defaultPrices";
  await mutateQuery(dropQuery);
  //create if not exists and populate defaultPrice table
  createReadStream(cvsFilePath).pipe(csvParser()).on('data', async (row) => {
    const columns = Object.keys(row);
    const createTableQuery = `CREATE TABLE IF NOT EXISTS
       defaultPrices (
          ${columns.map((column) => `${column} TEXT UNIQUE`).join(',\n')}
        );`;
    await mutateQuery(createTableQuery);

    const insertQuery = `INSERT OR IGNORE INTO defaultPrices (${columns.join(', ')})
    VALUES (${columns.map(() => '?').join(', ')})`;
    const values = columns.map((column) => row[column]);
    await mutateQuery(insertQuery, values);
  });
  // create if not exists cachedCountries table
  const query = `CREATE TABLE IF NOT EXISTS 
  cachedCountries(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT);`;
  await mutateQuery(query);
  console.log('Database seeded.');
}
