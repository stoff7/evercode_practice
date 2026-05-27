import express from 'express';
import logger from './utils/logger.js';
import router from './routes/index.js';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './app/swagger.js';

const app = express();

app.use(express.json());
app.use('/', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server started on port ${process.env.PORT || 3000}`);
});


