import { Router } from "express";
import logger from "../utils/logger.js";
import { createCurrencyRouter } from "./currency.router.js";
import { createPriceRouter } from "./price.router.js";

export function createRouter(currencyController, priceController) {
    const router = Router();

    router.use('/currency', createCurrencyRouter(currencyController));
    router.use('/price', createPriceRouter(priceController));

    router.get('/status', (req, res) => {
        logger.info('Status endpoint was called.');
        res.status(200).send("OK");
    });

    return router;
}
