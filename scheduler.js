const { InvalidIntervalError } = require('./errors');
const Logger = require('./logger');
require('dotenv').config();

const logger = new Logger(process.env.LOG_LEVEL || 'info');

logger.info('Scheduler module loaded.');

const schedule = (name, interval, task) => {
    if (interval < 1000) throw new InvalidIntervalError('Interval must be greater than 1000 milliseconds.');
    logger.info(`Scheduling task "${name}" to run every ${interval} milliseconds.`);
    setInterval(() => {
        logger.debug('Executing scheduled task...', `TASK=${name}`);
        logger.info(`Executing task "${name}".`);
        task();
    }, interval);
};

const runningTask = () => {
    logger.info('Running...', 'RUNNING_TASK ID=12345');
}

schedule('Running Task', 10_000, runningTask);

module.exports = { schedule };
