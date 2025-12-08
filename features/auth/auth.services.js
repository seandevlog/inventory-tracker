import Users from '../users/user.model.js';

export const login = async (data) => {
    const { username, password } = data;
    if (!username || !password) throw new Error('Missing credentials');
    
    const user = await Users.findOne({ username: username });
    
    if (!user) throw new Error('User not found'); 
    
    if (user.password !== password) throw new Error('Password is incorrect');
    // if (usernameError) req.flash('usernameLoginValidationError', usernameError.message);
    // if (passwordError) req.flash('passwordLoginValidationError', passwordError.message);
    
    // if (usernameError || passwordError) {
        // req.flash('loginValidationData', req.body)
        // return res.redirect('/login');
    //     throw new Error('Username or password is incorrect');
    // }
} 

export default {
    login
}