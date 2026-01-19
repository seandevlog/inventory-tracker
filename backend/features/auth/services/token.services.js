import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import config from '../../../config/index.js';

const generate = ( userId ) => { 
    const accessToken = generateAccess(userId);
    const refreshToken = generateRefresh();
    const hashedToken = hash(refreshToken);

    if (!accessToken || !refreshToken || !hashedToken) throw new Error('Invalid token configuration');
    return { accessToken, refreshToken, hashedToken };
}

const generateAccess = ( userId ) => {
    return userId && jwt.sign({ userId }, config.access.key, { expiresIn: config.access.expiresIn });
}

const generateRefresh = () => {
    return crypto.randomBytes(40).toString('hex');
}

const hash = (token) => {
    return token && crypto.createHash('sha256').update(token).digest('hex');
}

export default {
    generate,
    generateAccess,
    generateRefresh,
    hash
}