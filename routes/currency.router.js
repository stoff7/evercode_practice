import { Router } from "express";
import CurrencyController from "../controllers/currency.controller.js";
const router = new Router();

router.post('/', CurrencyController.createCurrency);
router.get('/', CurrencyController.getAllCurrencies);
router.get('/:id', CurrencyController.getCurrencyById);
router.put('/:id', CurrencyController.updateCurrency);
router.delete('/:id', CurrencyController.deleteCurrency);

export default router;