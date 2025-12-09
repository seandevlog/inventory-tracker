import Users from '../users/user.model.js';

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) throw new Error('Missing credentials');
    
    const user = await Users.findOne({ username: username });
    
    if (!user) throw new Error('User not found'); 
    
    if (user.password !== password) throw new Error('Password is incorrect');
} 

export const register = async (data) => {
    const { 
        username, 
        password, 
        givenName, 
        familyName, 
        contact, 
        address 
    } = data;

    if (!username || !password || !givenName || !familyName || !contact || !address ) throw new Error('Missing credentials');
    
    const user = await Users.create({ ...data, status: 'active' });
    if (!user) throw new Error('Failed to create user');
} 

export default {
    login,
    register
}