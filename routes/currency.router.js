import { Router } from "express";

export function createCurrencyRouter(CurrencyController) {
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
    router.post('/', (req, res) => CurrencyController.createCurrency(req, res));

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
    router.get('/', (req, res) => CurrencyController.getAllCurrencies(req, res));

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
    router.get('/:id', (req, res) => CurrencyController.getCurrencyById(req, res));

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
    router.put('/:id', (req, res) => CurrencyController.updateCurrency(req, res));

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
    router.delete('/:id', (req, res) => CurrencyController.deleteCurrency(req, res));

    return router;
}
