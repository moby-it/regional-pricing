import { createReadStream } from "fs";
import csvParser from "csv-parser";
import { mutateQuery } from "./db.mjs";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultPricesPath = `${__dirname}/default_prices.csv`;
const priceWeightsPath = `${__dirname}/price_weights.csv`;

async function dropTable(table) {
  const dropQuery = `DROP TABLE IF EXISTS ${table}`;
  await mutateQuery(dropQuery);
}
export async function seedDatabase() {
  //create if not exists and populate defaultPrices table
  await dropTable('defaultPrices');
  const createDefaultPricesTable = `CREATE TABLE IF NOT EXISTS
  defaultPrices ( service_name TEXT, cost INTEGER );`;
  await mutateQuery(createDefaultPricesTable);
  createReadStream(defaultPricesPath).pipe(csvParser()).on('data', async (row) => {
    const columns = Object.keys(row);
    const insertQuery = `INSERT OR IGNORE INTO defaultPrices (${columns.join(', ')})
    VALUES (${columns.map(() => '?').join(', ')})`;
    const values = columns.map((column) => row[column]);
    await mutateQuery(insertQuery, values);
  });
  //create if not exists and populate priceWeights table
  await dropTable('priceWeights');
  const createPriceWeightsTable = `CREATE TABLE IF NOT EXISTS
  priceWeights (
    country TEXT, code TEXT, price_weight REAL );`;
  await mutateQuery(createPriceWeightsTable);
  createReadStream(priceWeightsPath)
    .pipe(csvParser())
    .on('data', async (row) => {
      const columns = Object.keys(row);
      const insertQuery = ` INSERT  OR IGNORE INTO priceWeights 
      (${columns.join(', ')})
      VALUES (?, ?, ?)`;
      const values = columns.map((column) => row[column]);
      await mutateQuery(insertQuery, values);
    })
  console.log('Database seeded.');
}