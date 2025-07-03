const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/investments.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS investments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS cash_flow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS investment_operations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            investment_id INTEGER,
            ticker TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL NOT NULL,
            date TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS investment_provents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            investment_id INTEGER,
            amount REAL NOT NULL,
            date TEXT NOT NULL
        )
    `);
});

module.exports = db;