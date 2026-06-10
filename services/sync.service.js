import { fetchWithRetry } from '../utils/fetch.js';
import logger from '../utils/logger.js';

export class SyncService {
    constructor(currencyRepository, priceRepository, schedulerRepository) {
        this.currencyRepository = currencyRepository;
        this.priceRepository = priceRepository;
        this.schedulerRepository = schedulerRepository;
    }

    async syncPrices() {
        const log = this.schedulerRepository.createLog('price-sync');
        try {
            const currencies = this.currencyRepository.findAllCurrencies();
            if (!currencies.length) {
                this.schedulerRepository.updateLog(log.id, 'success');
                return;
            }

            const response = await fetchWithRetry(`${process.env.BINANCE_API}/ticker/price`);
            const allPrices = await response.json();

            const upsert = this.priceRepository.upsertPrice.bind(this.priceRepository);

            for (const currency of currencies) {
                const pairs = allPrices.filter(p => p.symbol.startsWith(currency.ticker));

                for (const pair of pairs) {
                    upsert({
                        currency_id: currency.id,
                        symbol: pair.symbol,
                        price: pair.price,
                        updated_at: new Date().toISOString()
                    });
                }
            }

            logger.info(`Price sync completed for ${currencies.length} currencies`);
            this.schedulerRepository.updateLog(log.id, 'success');
        } catch (error) {
            logger.error(`Price sync failed: ${error.message}`);
            this.schedulerRepository.updateLog(log.id, 'error', error.message);
            throw error;
        }
    }
}
