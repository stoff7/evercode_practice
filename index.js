import express from 'express';
import logger from './utils/logger.js';
import router from './routes/index.js';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server started on port ${process.env.PORT || 3000}`);
});

//Старый маршрут
// app.get('/status', (req, res) => {
//     logger.info('Status endpoint was called.', req.id);
//     res.send("OK");
// });


