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

export async function mutateQuery(sql, args) {
    try {
        const db = await connectToDb();
        await db.run(sql, args);
        await closeConnection(db);
    } catch (error) {
        console.error(error);
    }
}
export async function selectQuery(sql, args) {
    let data = [];
    try {
        const db = await connectToDb();
        await db.each(sql, args, (error, row) => {
            if (error) {
                console.log(error);
            }
            data.push(row)
        });
        await closeConnection(db);
        return data;
    } catch (error) {
        console.error(error);
    }
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