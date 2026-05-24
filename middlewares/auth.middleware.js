import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    logger.debug(`Authorization header: ${authHeader}`);
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        logger.debug(`Decoded JWT payload: ${JSON.stringify(decoded)}`);
    } catch (error) {
        logger.error(`JWT verification failed: ${error.message}`);
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
}