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
import { PriceRepository } from './repositories/price.repository.js';
import { SchedulerRepository } from './repositories/scheduler.repository.js';
import { SyncService } from './services/sync.service.js';
import { schedule } from './utils/scheduler.js';
import db from './db/database.js';
import './db/init.js';


const currencyRepository = new CurrencyRepository(db);
const priceRepository = new PriceRepository(db);
const schedulerRepository = new SchedulerRepository(db);

const currencyService = new CurrencyService(currencyRepository);
const syncService = new SyncService(currencyRepository, priceRepository, schedulerRepository);
const priceService = new PriceService(priceRepository);
const currencyController = new CurrencyController(currencyService);
const priceController = new PriceController(priceService);

schedule('price-sync', 60_000, () => syncService.syncPrices());

const router = createRouter(currencyController, priceController);

const app = express();


app.use(express.json());
app.use('/', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server started on port ${process.env.PORT || 3000}`);
});


