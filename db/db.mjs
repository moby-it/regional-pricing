import sqlite3 from 'sqlite3';

async function connectToDb(mode) {
    const db = new sqlite3.Database('./cached-coordinates.sqlite3', mode, err => {
        if (err) {
            console.error(err.message);
        }
        console.log('Succesfully connected to database.');
    })
    return db;
}

async function closeConnection(db) {
    db.close();
}

export async function seedDatabase() {
    const db = await connectToDb(sqlite3.OPEN_READWRITE);
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS cachedData(id INTEGER PRIMARY KEY, lat REAL, lon REAL, country TEXT)`);
        closeConnection(db);
    })
    return console.log('Database seeded.');
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