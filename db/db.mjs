import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

async function connectToDb() {
    const db = await sqlite.open({
        filename: 'cached-coordinates.sqlite3',
        driver: sqlite3.Database
    })
    console.log('Successfully connected to Database. ');
    return db;
}

async function closeConnection(db) {
    await db.close();
    console.log('Connection ended.');
}

export async function seedDatabase() {
    const db = await connectToDb();
    await db.run(`CREATE TABLE IF NOT EXISTS 
    cachedData(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT);`);

    console.log('Database seeded.');
     await closeConnection(db);
}

export async function searchCached(lat, lon) {
    const sql = `SELECT country FROM cachedData  WHERE lat= ? AND lon = ?`
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
        : false;
}

export async function cacheCoordinates(lat, lon, country) {
    const db = await connectToDb();
    const sql = `INSERT INTO cachedData ( lat, lon, country)VALUES (?,?,?)`;

    await db.run(sql, [lat, lon, country], async (err) => {
        if (err) {
            console.error(err.message);
        }

    });
    console.log('Coordinates cached succesfully.');
    await closeConnection(db);
}