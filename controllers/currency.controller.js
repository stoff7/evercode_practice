import CurrencyService from "../services/currency.service.js";

export class CurrencyController {
    async createCurrency(req, res) {
        try {
            const currency = await CurrencyService.createCurrency(req.body);
            res.status(201).json(currency);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async getAllCurrencies(req, res) {
        try {
            const currencies = await CurrencyService.getAllCurrencies();
            res.json(currencies);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async getCurrencyById(req, res) {
        try {
            const currency = await CurrencyService.getCurrency(req.params.id);
            res.json(currency);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async updateCurrency(req, res) {
        try {
            const currency = await CurrencyService.updateCurrency(req.params.id, req.body);
            res.json(currency);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
    async deleteCurrency(req, res) {
        try {
            await CurrencyService.deleteCurrency(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

export default new CurrencyController();
