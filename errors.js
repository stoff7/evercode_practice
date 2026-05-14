class AppError extends Error {
    statusCode;
    code;
    timestamp;

    constructor(message, code = 'APP_ERROR', statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}


class InvalidMessageError extends AppError {
    constructor(message) {
        super(message, 'INVALID_MESSAGE');
    }
}

class InvalidIntervalError extends AppError {
    constructor(message) {
        super(message, 'INVALID_INTERVAL');
    }
}
module.exports = { AppError, InvalidMessageError, InvalidIntervalError };