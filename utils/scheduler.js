import logger from './logger.js';
import { InvalidIntervalError } from '../app/errors.js';
import 'dotenv/config';

logger.info('Scheduler module loaded.');

export const schedule = (name, interval, task) => {
    if (interval < 1000) { logger.error('Interval must be greater than 1000 milliseconds.'); throw new InvalidIntervalError('Interval must be greater than 1000 milliseconds.') };
    logger.info(`Scheduling task "${name}" to run every ${interval} milliseconds.`);
    setInterval(() => {
        logger.debug('Executing scheduled task...', `TASK=${name}`);
        logger.info(`Executing task "${name}".`);
        task();
    }, interval);
};

// нужен был для тестирования, сейчас не нужен
// const runningTask = () => {
//     logger.info('Running...', 'RUNNING_TASK ID=12345');
// }

// schedule('Running Task', 10_000, runningTask);
