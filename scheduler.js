const createLogger = require('./logger');

const logger = createLogger();

logger('Scheduler module loaded.');

const schedule = (name, interval, task) => {
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
