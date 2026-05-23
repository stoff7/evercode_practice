import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    logger.debug(`Decoded JWT payload: ${JSON.stringify(decoded)}`);
    next();
}