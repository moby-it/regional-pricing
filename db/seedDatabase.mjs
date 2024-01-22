import { createReadStream } from "fs";
import csvParser, * as cvsParser from "csv-parser";
import { runQuery } from "./db.mjs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cvsFilePath = `${__dirname}/price_weights.csv`;

export async function seedDatabase() {
  //create if not exists and populate "country" table
  createReadStream(cvsFilePath).pipe(csvParser()).on('data', async (row) => {
    const columns = Object.keys(row);
    const createTableQuery = `CREATE TABLE IF NOT EXISTS
       country (
          ${columns.map((column) => `${column} TEXT`).join(',\n')}
        );`;
    await runQuery(createTableQuery);

    const insertQuery = `INSERT INTO country (${columns.join(', ')})
    VALUES (${columns.map(() => '?').join(', ')})`;
    const values = columns.map((column) => row[column]);
    await runQuery(insertQuery, values);
  });
  // create if not exists cachedCountries table
  const query = `CREATE TABLE IF NOT EXISTS 
  cachedCountries(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT);`;
  await runQuery(query);
  console.log('Database seeded.');
}
