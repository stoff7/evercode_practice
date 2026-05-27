import { Router } from "express";
import logger from "../utils/logger.js";
import currencyRouter from "./currency.router.js";
import priceRouter from "./price.router.js";

const router = Router();

router.use('/currency', currencyRouter);
router.use('/price', priceRouter);

router.get('/status', (req, res) => {
    logger.info('Status endpoint was called.');
    res.status(200);
    res.send("OK");
});

export default router;