import db from './database.js';

db.exec(`
CREATE TABLE IF NOT EXISTS currencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    ticker TEXT NOT NULL UNIQUE
);
`);
