import { Router } from "express";
import PriceController from "../controllers/price.controller.js";
const router = Router();


router.post('/', PriceController.handle);

export default router;