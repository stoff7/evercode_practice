
export class CurrencyRepository {
    constructor(db) {
        this.db = db;
    }
    createCurrency(currency) {
        const result = this.db.prepare('INSERT INTO currencies (name, ticker) VALUES (?, ?)').run(currency.name, currency.ticker);
        return this.findCurrencyById(result.lastInsertRowid);
    };
    findCurrencyByTicker(ticker) {
        const currency = this.db.prepare('SELECT * FROM currencies WHERE ticker = ?').get(ticker);
        return currency;
    };
    findCurrencyById(id) {
        const currency = this.db.prepare('SELECT * FROM currencies WHERE id = ?').get(id);
        return currency;
    };
    findAllCurrencies() {
        const currencies = this.db.prepare('SELECT * FROM currencies').all();
        return currencies;
    };
    updateCurrency(id, currency) {
        const update = this.db.prepare('UPDATE currencies SET name = ?, ticker = ? WHERE id = ?');

        const run = this.db.transaction((id, data) => {
            const oldCurrency = this.findCurrencyById(id);
            const updatedCurrency = {
                name: data.name ?? oldCurrency.name,
                ticker: data.ticker ?? oldCurrency.ticker
            };
            update.run(updatedCurrency.name, updatedCurrency.ticker, id);
            return this.findCurrencyById(id);
        });

        return run(id, currency);
    }

    deleteCurrency(id) {
        const run = this.db.transaction((id) => {
            const currency = this.findCurrencyById(id);
            this.db.prepare('DELETE FROM currencies WHERE id = ?').run(id);
            return currency;
        });
        return run(id);
    }

};
