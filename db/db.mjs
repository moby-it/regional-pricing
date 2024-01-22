import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

async function connectToDb() {
    const db = await sqlite.open({
        filename: 'regional_pricing.sqlite3',
        driver: sqlite3.Database
    });
    return db;
}

async function closeConnection(db) {
    try {
        await db.close();
    } catch (e) {
        console.warn(e);
    }
}
export async function runQuery(sql, values) {
    const db = await connectToDb();
    try {
        await db.run(sql, values);
        await closeConnection(db);
    } catch (error) {
        console.error(error);
    }
}

export async function seedDatabase() {
    const db = await connectToDb();
    await db.run(`CREATE TABLE IF NOT EXISTS 
    cachedCountries(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT);`);

    console.log('Database seeded.');
    await closeConnection(db);
}

/**
 * 
 * @param {string} lat 
 * @param {string} lon 
 * @returns {Promise<string | null>}
 */
export async function searchCached(lat, lon) {
    const sql = `SELECT country FROM cachedCountries  WHERE lat= ? AND lon = ?`;
    const db = await connectToDb();

    const result = await db.get(sql, [lat, lon], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row;
    });
    await closeConnection(db);
    return result
        ? result.country
        : null;
}

export async function cacheCoordinates(lat, lon, country) {
    const db = await connectToDb();
    const sql = `INSERT INTO cachedCountries ( lat, lon, country)VALUES (?,?,?)`;

    await db.run(sql, [lat, lon, country], async (err) => {
        if (err) {
            console.error(err.message);
        }

    });
    console.log('Coordinates cached succesfully.');
    await closeConnection(db);
}