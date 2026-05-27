import CurrencyService from "../services/currency.service.js";
import logger from "../utils/logger.js";

export class CurrencyController {
    async createCurrency(req, res) {
        try {
            logger.info(`Received request to create currency with data: ${JSON.stringify(req.body)}`);
            const currency = await CurrencyService.createCurrency(req.body);
            res.status(201).json(currency);
        } catch (error) {
            logger.error(`Error occurred while creating currency: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async getAllCurrencies(req, res) {
        try {
            logger.info('Received request to get all currencies');
            const currencies = await CurrencyService.getAllCurrencies();
            res.json(currencies);
        } catch (error) {
            logger.error(`Error occurred while fetching currencies: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async getCurrencyById(req, res) {
        try {
            logger.info(`Received request to get currency by ID: ${req.params.id}`);
            const currency = await CurrencyService.getCurrency(req.params.id);
            res.json(currency);
        } catch (error) {
            logger.error(`Error occurred while fetching currency: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async updateCurrency(req, res) {
        try {
            logger.info(`Received request to update currency with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
            const currency = await CurrencyService.updateCurrency(req.params.id, req.body);
            res.json(currency);
        } catch (error) {
            logger.error(`Error occurred while updating currency: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async deleteCurrency(req, res) {
        try {
            logger.info(`Received request to delete currency with ID: ${req.params.id}`);
            await CurrencyService.deleteCurrency(req.params.id);
            res.status(204).send();
        } catch (error) {
            logger.error(`Error occurred while deleting currency: ${error.message}`);
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

export default new CurrencyController();
