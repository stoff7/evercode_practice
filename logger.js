const { appName, version } = require('./config');
const { InvalidMessageError } = require('./errors');


class Logger {
    constructor() { }

    #log(message, level, requestId) {
        const timestamp = new Date().toISOString();
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        console.log(`[${timestamp}] ${appName} ${version} [${level}] ${requestId || ''} ${message}`)
    }

    info(message, requestId) {
        this.#log(message, 'INFO', requestId)
    }
    warn(message, requestId) {
        this.#log(message, 'WARN', requestId)
    }
    error(message, requestId) {
        this.#log(message, 'ERROR', requestId)
    }
    trace(message, requestId) {
        this.#log(message, 'TRACE', requestId)
    }
    debug(message, requestId) {
        this.#log(message, 'DEBUG', requestId)
    }

}

module.exports = Logger;