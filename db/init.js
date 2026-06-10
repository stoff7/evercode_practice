import db from './database.js';

db.exec(`
CREATE TABLE IF NOT EXISTS currencies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    ticker TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS prices (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    currency_id INTEGER NOT NULL,
    symbol      TEXT    NOT NULL,
    price       TEXT    NOT NULL,
    updated_at  TEXT    NOT NULL,
    FOREIGN KEY (currency_id) REFERENCES currencies(id) ON DELETE CASCADE,
    UNIQUE(currency_id, symbol)
);


CREATE TABLE IF NOT EXISTS scheduler_logs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name  TEXT NOT NULL,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    status     TEXT NOT NULL,
    error      TEXT
);

`);
