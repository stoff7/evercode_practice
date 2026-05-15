const { appName, version } = require('./config');
const { InvalidMessageError, AppError } = require('./errors');
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
    constructor(minLevel = 'info') {
        if (!LEVELS.hasOwnProperty(minLevel)) throw new AppError(`Invalid log level: ${minLevel}`);
        this.#minLevel = LEVELS[minLevel];
    }

    #log(message, level, requestId) {
        if (!message) throw new InvalidMessageError('Message is required for logging.');
        if (LEVELS[level] < this.#minLevel) return;

        const reqIdPart = requestId ? `[REQ_ID=${requestId}]` : '';
        const timestamp = new Date().toISOString();
        const output = `[${timestamp}] ${appName} ${version} [${level}]${reqIdPart} ${message}`;

        level === 'error' ? console.error(output) : console.log(output);
    }
    /**
     * 
     * @param {string} message 
     * @param {string} [requestId]
     */
    info(message, requestId) {

        this.#log(message, 'info', requestId)
    }
    /**
    * 
    * @param {string} message 
    * @param {string} [requestId]
    */
    warn(message, requestId) {

        this.#log(message, 'warn', requestId)
    }
    /**
    * 
    * @param {string} message 
    * @param {string} [requestId]
    */
    error(message, requestId) {

        this.#log(message, 'error', requestId)
    }
    /**
    * 
    * @param {string} message 
    * @param {string} [requestId]
    */
    trace(message, requestId) {

        this.#log(message, 'trace', requestId)
    }
    /**
    * 
    * @param {string} message 
    * @param {string} [requestId]
    */
    debug(message, requestId) {

        this.#log(message, 'debug', requestId)
    }

}

module.exports = Logger;