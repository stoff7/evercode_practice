import { AppError } from "../app/errors.js";

export class CurrencyService {
    constructor(CurrencyRepository) {
        this.CurrencyRepository = CurrencyRepository;
    }
    createCurrency(data) {
        if (!data.name || !data.ticker) {
            throw new AppError('Name and ticker are required to create a currency.', 'BAD_REQUEST', 400);
        }
        return this.CurrencyRepository.createCurrency(data);

    }

    getCurrency(id) {
        const currency = this.CurrencyRepository.findCurrencyById(id);
        if (!currency) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        return currency;
    }

    getAllCurrencies() {
        return this.CurrencyRepository.findAllCurrencies();
    }

    updateCurrency(id, data) {
        if (!data.name && !data.ticker) {
            throw new AppError('At least one of name or ticker must be provided to update a currency.', 'BAD_REQUEST', 400);
        };
        const currency = this.CurrencyRepository.findCurrencyById(id);
        if (!currency) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        return this.CurrencyRepository.updateCurrency(id, data);
    }
    deleteCurrency(id) {
        const currency = this.CurrencyRepository.findCurrencyById(id);
        if (!currency) throw new AppError('Currency not found', 'NOT_FOUND', 404);
        return this.CurrencyRepository.deleteCurrency(id);
    }
}