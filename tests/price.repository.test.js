import Database from 'better-sqlite3';
import { CurrencyRepository } from '../repositories/currency.repository.js';
import { PriceRepository } from '../repositories/price.repository.js';

let db;
let currencyRepo;
let priceRepo;

beforeEach(() => {
    db = new Database(':memory:');
    db.exec(`
        CREATE TABLE currencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            ticker TEXT NOT NULL UNIQUE
        );
        CREATE TABLE prices (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            currency_id INTEGER NOT NULL,
            symbol      TEXT    NOT NULL,
            price       TEXT    NOT NULL,
            updated_at  TEXT    NOT NULL,
            FOREIGN KEY (currency_id) REFERENCES currencies(id) ON DELETE CASCADE,
            UNIQUE(currency_id, symbol)
        );
    `);
    currencyRepo = new CurrencyRepository(db);
    priceRepo = new PriceRepository(db);
});

afterEach(() => {
    db.close();
});

test('upsertPrice inserts new price', () => {
    const currency = currencyRepo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCUSDT', price: '42000', updated_at: new Date().toISOString() });
    const prices = priceRepo.findPriceByCurrencyId(currency.id);
    expect(prices).toHaveLength(1);
    expect(prices[0].symbol).toBe('BTCUSDT');
});

test('upsertPrice updates existing price', () => {
    const currency = currencyRepo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    const updated_at = new Date().toISOString();
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCUSDT', price: '42000', updated_at });
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCUSDT', price: '43000', updated_at });
    const prices = priceRepo.findPriceByCurrencyId(currency.id);
    expect(prices).toHaveLength(1);
    expect(prices[0].price).toBe('43000');
});

test('findByCurrencyTicker returns prices by ticker', () => {
    const currency = currencyRepo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    const updated_at = new Date().toISOString();
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCUSDT', price: '42000', updated_at });
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCBNB', price: '100', updated_at });
    const prices = priceRepo.findByCurrencyTicker('BTC');
    expect(prices).toHaveLength(2);
    expect(prices.every(p => p.symbol.startsWith('BTC'))).toBe(true);
});

test('deletePriceByCurrencyId removes prices', () => {
    const currency = currencyRepo.createCurrency({ name: 'Bitcoin', ticker: 'BTC' });
    priceRepo.upsertPrice({ currency_id: currency.id, symbol: 'BTCUSDT', price: '42000', updated_at: new Date().toISOString() });
    priceRepo.deletePriceByCurrencyId(currency.id);
    expect(priceRepo.findPriceByCurrencyId(currency.id)).toHaveLength(0);
});
