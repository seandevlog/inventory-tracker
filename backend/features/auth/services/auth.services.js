import Users from '../../users/user.model.js';
import Passwords from './password.services.js';
import Sessions from './session.services.js';

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) throw new Error('Missing credentials');
    
    const user = await Users.findOne({ username: username });
    if (!user) throw new Error('User not found'); 
    
    // const result = await Passwords.compare(password, user.password);
    // if (!result) throw new Error('Password incorrect');

    return user;
} 

export const register = async (data) => {
    let { password } = data; 
    password = await Passwords.hash(password);

    const user = await Users.create({ ...data, password, status: 'active' });
    if (!user) throw new Error('Failed to create user');
}

export default {
    login,
    register
}