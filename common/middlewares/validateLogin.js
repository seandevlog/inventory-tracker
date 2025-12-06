import User from '../../features/users/user.model.js';

// Didn't use try/catch since findOne doesn't throw an error
export const validateLoginMiddleware = async (req, res, next) => {
    let usernameError, passwordError;
    if (!req.body.username) usernameError = new Error('Username is required');
    if (!req.body.password) passwordError = new Error('Password is required');
    
    if (!usernameError && !passwordError) {
        const user = await User.findOne({ username: req.body.username });
        if (!user) { 
            usernameError = new Error('User not found'); 
        } else if (user.password !== req.body.password) { 
            passwordError = new Error('Password is incorrect');
        }
    }
        
    if (usernameError) req.flash('usernameLoginValidationError', usernameError.message);
    if (passwordError) req.flash('passwordLoginValidationError', passwordError.message);
    
    if (usernameError || passwordError) {
        req.flash('loginValidationData', req.body)
        return res.redirect('/login');
    }
    
    next();
}

export default validateLoginMiddleware;