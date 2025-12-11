import jwt from 'jsonwebtoken';
import Config from '../../config/index.js';

export const isAuthenticated = (req, res, next) => {
    const accessToken = req.headers?.authorization?.split(' ')[1];
    if (accessToken) console.log('isAuthenticated');
    if (!accessToken) throw new Error('User is not authorized');

    try {
        jwt.verify(accessToken, Config.access.key);
    } catch (err) {
        if (err.name === 'TokenExpiredError') return res.status(401).json({ err });
    }

    next();
}