import logger from "../utils/logger.js";
import PriceService from "../services/price.service.js";

class PriceController {
    async handle(req, res) {
        try {
            logger.info(`Received price request for ticker: ${req.body.ticker}`);
            const ticker = req.body.ticker.toUpperCase();
            const prices = await PriceService.handlePrice(ticker);
            res.status(200).json({ ticker, prices });
        } catch (error) {
            logger.error(`Error occurred while processing price request: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

export default new PriceController();