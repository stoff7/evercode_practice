import Database from 'better-sqlite3';
import { CurrencyRepository } from '../repositories/currency.repository.js';

let db;
let repo;

beforeEach(() => {
    db = new Database(':memory:');
    db.exec(`
        CREATE TABLE currencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            ticker TEXT NOT NULL UNIQUE
        )
    `);
    repo = new CurrencyRepository(db);
});

afterEach(() => {
    db.close();
});

test('createCurrency returns created currency', () => {
    const currency = repo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    expect(currency.id).toBeDefined();
    expect(currency.name).toBe('Bitcoin');
    expect(currency.ticker).toBe('BTC');
});

test('findCurrencyById returns currency', () => {
    const created = repo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    expect(repo.findCurrencyById(created.id)).toEqual(created);
});

test('findCurrencyById returns undefined for missing id', () => {
    expect(repo.findCurrencyById(9999)).toBeUndefined();
});

test('findAllCurrencies returns all currencies', () => {
    repo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    repo.createCurrency({ name: 'Ethereum', ticker: 'ETH' });
    expect(repo.findAllCurrencies()).toHaveLength(2);
});

test('updateCurrency updates only provided fields', () => {
    const created = repo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    const updated = repo.updateCurrency(created.id, { name: 'Bitcoin Updated' });
    expect(updated.name).toBe('Bitcoin Updated');
    expect(updated.ticker).toBe('BTC');
});

test('deleteCurrency removes currency', () => {
    const created = repo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    repo.deleteCurrency(created.id);
    expect(repo.findCurrencyById(created.id)).toBeUndefined();
});
