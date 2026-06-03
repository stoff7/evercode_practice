import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const dbPath = path.resolve(path.dirname(__filename), '../database.db');
let db;
try {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    logger.info('Connected to the database successfully.');
}
catch (error) {
    logger.error('Failed to connect to the database:', error);
    throw error;
}
export default db;


