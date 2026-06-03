import { Router } from "express";

export function createPriceRouter(PriceController) {
    const router = Router();


    router.post('/', (req, res) => PriceController.handle(req, res));
    return router;
}