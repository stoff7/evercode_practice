import express from 'express';
import logger from './utils/logger.js';
import { createRouter } from './routes/index.js';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './app/swagger.js';
import { CurrencyService } from './services/currency.service.js';
import { PriceService } from './services/price.service.js';
import { CurrencyController } from './controllers/currency.controller.js';
import { PriceController } from './controllers/price.controller.js';
import { CurrencyRepository } from './repositories/currency.repository.js';
import db from './db/database.js';
import './db/init.js';


const currencyRepository = new CurrencyRepository(db);
const currencyService = new CurrencyService(currencyRepository);
const priceService = new PriceService(currencyService);
const currencyController = new CurrencyController(currencyService);
const priceController = new PriceController(priceService);

const router = createRouter(currencyController, priceController);

const app = express();


app.use(express.json());
app.use('/', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server started on port ${process.env.PORT || 3000}`);
});


