import Users from '../users/user.model.js';
import bcrypt from '../../common/utils/bcrypt.api.js';

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) throw new Error('Missing credentials');
    
    const user = await Users.findOne({ username: username });
    
    if (!user) throw new Error('User not found'); 
    
    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new Error('Password incorrect');
} 

export const register = async (data) => {
    let { password } = data; 
    password = await bcrypt.hashPassword(password);

    const user = await Users.create({ ...data, password, status: 'active' });
    if (!user) throw new Error('Failed to create user');
} 

export default {
    login,
    register
}