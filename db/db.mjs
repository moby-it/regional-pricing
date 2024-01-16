import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

async function connectToDb() {
    const db = await sqlite.open({
        filename: 'cached-coordinates.sqlite3',
        driver: sqlite3.Database
    })
    console.log('Successfully connected to Database. ')
    return db;
}

async function closeConnection(db) {
    await db.close();
    console.log('Connection ended.')
}

export async function seedDatabase() {
    const db = await connectToDb();
    await db.run(`CREATE TABLE IF NOT EXISTS 
    cachedData(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT);`);

    console.log('Database seeded.');
    return await closeConnection(db);
}

export async function searchCached(lat, lon) {
    const sql = `SELECT country FROM cachedData  WHERE lat= ? AND lon = ?`
    const db = await connectToDb(sqlite3.OPEN_READONLY);
    db.serialize(() => {
        const country = db.get(sql, [lat, lon], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row;
        });
        closeConnection(db);
    })
    await closeConnection(db);
    console.log(country);
}

export async function cacheCoordinates(lat, lon, country) {
    const db = await connectToDb(sqlite3.OPEN_READWRITE);
    const sql = `INSERT INTO cachedData VALUES (?),(?),(?)`;
    db.serialize(() => {
        db.run(sql, [lat, lon, country], err => {
            if (err) {
                return console.error(err.message);
            }
            return console.log('Coordinates cached succesfully.');
        });
        closeConnection(db);
    })
}