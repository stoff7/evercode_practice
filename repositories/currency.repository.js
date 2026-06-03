
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
        const oldCurrency = this.findCurrencyById(id);
        const updatedCurrency = {
            id: id,
            name: currency.name ?? oldCurrency.name,
            ticker: currency.ticker ?? oldCurrency.ticker
        }
        this.db.prepare('UPDATE currencies SET name = ?, ticker = ? WHERE id = ?').run(updatedCurrency.name, updatedCurrency.ticker, id);
        return this.findCurrencyById(id);
    };
    deleteCurrency(id) {
        const deletedcurrency = this.findCurrencyById(id);
        console.log(this.db.prepare('DELETE FROM currencies WHERE id = ?').run(id));
        return deletedcurrency;
    };
};

// const currencyRepository = new CurrencyRepository();
// const currency = currencyRepository.createCurrency({ name: 'test', ticker: 'tst' });
// console.log(currencyRepository.findCurrencyByTicker('tst'));
// console.log(currencyRepository.findCurrencyById(currency.id));
// console.log(currencyRepository.findAllCurrencies());
// console.log(currencyRepository.updateCurrency(currency.id, { name: 'updated test', ticker: 'utst' }));
// console.log(currencyRepository.findAllCurrencies());
// console.log(currencyRepository.deleteCurrency(currency.id));
// console.log(currencyRepository.findAllCurrencies());

