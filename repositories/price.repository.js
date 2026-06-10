export class PriceRepository {
    constructor(db) {
        this.db = db;
    }
    upsertPrice(price) {
        const upsert = this.db.prepare(`
        INSERT INTO prices (currency_id, symbol, price, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(currency_id, symbol) DO UPDATE SET
            price = excluded.price,
            updated_at = excluded.updated_at
    `);
        upsert.run(price.currency_id, price.symbol, price.price, price.updated_at);
        return this.findPriceByCurrencyId(price.currency_id);
    }
    findPriceByCurrencyId(currency_id) {
        const price = this.db.prepare('SELECT * FROM prices WHERE currency_id = ?').all(currency_id);
        return price;
    }
    findAllPrices() {
        const prices = this.db.prepare('SELECT * FROM prices').all();
        return prices;
    }
    findBySymbol(symbol) {
        const price = this.db.prepare('SELECT * FROM prices WHERE symbol = ?').get(symbol);
        return price;
    }
    findByCurrencyTicker(ticker) {
        const price = this.db.prepare(`
        SELECT p.* FROM prices p
        JOIN currencies c ON c.id = p.currency_id
        WHERE c.ticker = ?
    `).all(ticker);
        return price;
    }

    deletePriceByCurrencyId(currency_id) {
        const run = this.db.transaction((currency_id) => {
            const price = this.findPriceByCurrencyId(currency_id);
            this.db.prepare('DELETE FROM prices WHERE currency_id = ?').run(currency_id);
            return price;
        });
        return run(currency_id);
    }
};