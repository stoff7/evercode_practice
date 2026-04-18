const { appName, version } = require('./config');

const createLogger = () => {
    return (message) => {
        console.log(`[${appName} v${version}] ${message}`);
    };
};

module.exports = createLogger;