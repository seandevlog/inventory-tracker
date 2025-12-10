import Users from '../users/user.model.js';
import bcrypt from '../../common/utils/bcrypt.api.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import config from '../../config/index.js';
import Sessions from './session.model.js';

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) throw new Error('Missing credentials');
    
    const user = await Users.findOne({ username: username });
    if (!user) throw new Error('User not found'); 
    
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error('Password incorrect');

    return user;
} 

export const register = async (data) => {
    let { password } = data; 
    password = await bcrypt.hashPassword(password);

    const user = await Users.create({ ...data, password, status: 'active' });
    if (!user) throw new Error('Failed to create user');
}

const generateTokens = async (userId) => { 
    const accessToken = jwt.sign({ userId }, config.accessKey, { expiresIn: '15m'});
    const refreshToken = crypto.randomBytes(40).toString();
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const session = await Sessions.create({ 
        userId, 
        hashedToken, 
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    if (!session) throw new Error('Failed to create session');

    return { accessToken, refreshToken };
} 


export default {
    login,
    register,
    generateTokens
}