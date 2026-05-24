import jwt from 'jsonwebtoken';
import authMiddleware from '../middlewares/auth.middleware.js';
import { jest } from '@jest/globals';

test('authMiddleware should decode JWT and call next', () => {
    const req = {
        headers: {
            'authorization': jwt.sign({ userId: 123 }, process.env.JWT_SECRET)
        }
    };
    const res = {};
    const next = jest.fn();
    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
});
