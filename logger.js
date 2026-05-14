const { appName, version } = require('./config');
const { InvalidMessageError } = require('./errors');

const createLogger = () => {
    return (message) => {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        console.log(`[${appName} v${version}] ${message}`);
    };
};

module.exports = createLogger;