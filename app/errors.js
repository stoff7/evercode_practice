export class AppError extends Error {
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


export class InvalidMessageError extends AppError {
    constructor(message) {
        super(message, 'INVALID_MESSAGE');
    }
}

export class InvalidIntervalError extends AppError {
    constructor(message) {
        super(message, 'INVALID_INTERVAL');
    }
}