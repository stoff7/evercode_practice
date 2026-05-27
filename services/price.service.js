import { AppError } from "../app/errors.js";
import CurrencyService from "./currency.service.js";
import { fetchWithRetry } from "../utils/fetch.js";

const BINANCE_API = process.env.BINANCE_API;

class PriceService {
    async handlePrice(ticker) {
        const currencies = await CurrencyService.getAllCurrencies();
        const currency = currencies.find(c => c.ticker === ticker);
        if (!currency) {
            throw new AppError(`Currency with ticker ${ticker} not found.`, 'NOT_FOUND', 404);
        }

        const response = await fetchWithRetry(`${BINANCE_API}/ticker/price`);
        const data = await response.json();

        return data.filter(item => item.symbol.includes(currency.ticker));
    }
}

export default new PriceService();

