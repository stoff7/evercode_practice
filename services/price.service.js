import { AppError } from "../app/errors.js";

export class PriceService {
    constructor(priceRepository) {
        this.priceRepository = priceRepository;
    }

    handlePrice(ticker) {
        const prices = this.priceRepository.findByCurrencyTicker(ticker);
        if (!prices.length) {
            throw new AppError(`No prices found for ticker ${ticker}`, 'NOT_FOUND', 404);
        }
        return prices;
    }
}

