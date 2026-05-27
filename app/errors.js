/**
 * Base class for application-specific errors
 * @description Extends default Error class and adds statusCode, code, and timestamp.
 */
export class AppError extends Error {
    statusCode;
    code;
    timestamp;
    /**
     * @param {String} message 
     * @param {String} code 
     * @param {Number} statusCode 
     */
    constructor(message, code = 'APP_ERROR', statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error class for invalid log messages
 * @description Used when a log message is missing or invalid
 */
export class InvalidMessageError extends AppError {
    constructor(message) {
        super(message, 'INVALID_MESSAGE');
    }
}
/**
 * Error class for invalid intervals in the scheduler
 * @description Used when a scheduled task is given an interval less than 1000 milliseconds
 */
export class InvalidIntervalError extends AppError {
    constructor(message) {
        super(message, 'INVALID_INTERVAL');
    }
}