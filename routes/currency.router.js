import { Router } from "express";
import CurrencyController from "../controllers/currency.controller.js";
const router = Router();

/**
 * @openapi
 * /currency:
 *   post:
 *     summary: Create a new currency
 *     tags: [Currency]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ticker:
 *                 type: string
 *     responses:
 *       201:
 *         description: Currency created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', CurrencyController.createCurrency);

/**
 * @openapi
 * /currency:
 *   get:
 *     summary: Get all currencies
 *     tags: [Currency]
 *     responses:
 *       200:
 *         description: List of currencies
 */
router.get('/', CurrencyController.getAllCurrencies);

/**
 * @openapi
 * /currency/{id}:
 *   get:
 *     summary: Get currency by ID
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Currency found
 *       404:
 *         description: Currency not found
 */
router.get('/:id', CurrencyController.getCurrencyById);

/**
 * @openapi
 * /currency/{id}:
 *   put:
 *     summary: Update currency
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ticker:
 *                 type: string
 *     responses:
 *       200:
 *         description: Currency updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Currency not found
 */
router.put('/:id', CurrencyController.updateCurrency);

/**
 * @openapi
 * /currency/{id}:
 *   delete:
 *     summary: Delete currency
 *     tags: [Currency]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Currency deleted successfully
 *       404:
 *         description: Currency not found
 */
router.delete('/:id', CurrencyController.deleteCurrency);

export default router;
