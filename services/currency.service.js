import { AppError } from "../app/errors.js";

let nextId = 1;
const currencies = [];


export class CurrencyService {

    async createCurrency(data) {
        if (!data.name || !data.ticker) {
            throw new AppError('Name and ticker are required to create a currency.', 'BAD_REQUEST', 400);
        }
        const currency = {
            id: nextId++,
            name: data.name,
            ticker: data.ticker
        };
        currencies.push(currency);
        return currency;
    }

    async getCurrency(id) {
        const currency = currencies.find(c => c.id === parseInt(id));
        if (!currency) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        return currency;
    }

    async getAllCurrencies() {
        return currencies;
    }

    async updateCurrency(id, data) {
        if (!data.name && !data.ticker) {
            throw new AppError('At least one of name or ticker must be provided to update a currency.', 'BAD_REQUEST', 400);
        }
        const currency = currencies.find(c => c.id === parseInt(id));
        if (!currency) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        currency.name = data.name || currency.name;
        currency.ticker = data.ticker || currency.ticker;
        return currency;
    }
    async deleteCurrency(id) {
        const index = currencies.findIndex(c => c.id === parseInt(id));
        if (index === -1) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        currencies.splice(index, 1);
    }

}

export default new CurrencyService();