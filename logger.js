const { appName, version } = require('./config');
const { InvalidMessageError } = require('./errors');
const LEVELS = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 };


/**
 * Simple logger class
 * @description Logs messages with different levels and timestamps
 */
class Logger {
    #minLevel;
    /**
     * @constructor
     * @param {string} minLevel Minimum log level to output 
     * LEVELS = { trace: 0, debug: 1, info: 2, warn: 3, error: 4 };
     */
    constructor(minLevel) {
        this.#minLevel = LEVELS[minLevel];
    }

    #log(message, level, requestId) {
        if (LEVELS[level] < this.#minLevel) return;
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${appName} ${version} [${level}] ${requestId || ''} ${message}`)
    }

    info(message, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        this.#log(message, 'info', requestId)
    }
    warn(message, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        this.#log(message, 'warn', requestId)
    }
    error(message, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        this.#log(message, 'error', requestId)
    }
    trace(message, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        this.#log(message, 'trace', requestId)
    }
    debug(message, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        this.#log(message, 'debug', requestId)
    }

}

module.exports = Logger;