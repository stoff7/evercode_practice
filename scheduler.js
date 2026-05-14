const { InvalidIntervalError } = require('./errors');
const createLogger = require('./logger');

const logger = createLogger();

logger('Scheduler module loaded.');

const schedule = (name, interval, task) => {
    if (interval < 1000) throw new InvalidIntervalError('Interval must be greater than 1000 milliseconds.');
    logger(`Scheduling task "${name}" to run every ${interval} milliseconds.`);
    setInterval(() => {
        logger(`Executing task "${name}".`);
        task();
    }, interval);
};

const runningTask = () => {
    logger('Running...');
}

schedule('Running Task', 10_000, runningTask);

module.exports = { schedule };
