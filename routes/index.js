import { Router } from "express";
import logger from "../utils/logger.js";
import currencyRouter from "./currency.router.js";

const router = Router();

router.use('/currency', currencyRouter);

router.get('/status', (req, res) => {
    logger.info('Status endpoint was called.');
    res.status(200);
    res.send("OK");
});

export default router;