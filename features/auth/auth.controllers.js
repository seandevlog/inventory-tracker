import User from '../users/user.model.js';
import services from './auth.services.js';
// TODO - compile login and register routes into one if possible
// TODO - differentiate server-side validation and authentication, and authorization
// ! Do not return server-side validation to the user
export const login =  async (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'layouts/auth',
    });
}

export const loginSubmit = async (req, res) => {
    try {
        const { _id } = await services.login({ ...req.body });
        const { accessToken, refreshToken } = await services.generateTokens(_id);
        // TODO - res to client with AT and RT as an httpOnly cookie
        res.status(200).json({ redirect: '/' });
    } catch (err) {;
        return res.status(500).json({ error: err.message });
    }
}

export const register = (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: 'layouts/auth',
    });
}

export const registerSubmit = async (req, res) => {
    try {
        await services.register({ ...req.body });
        res.status(200).json({ redirect: '/login' });
    } catch (err) {;
        return res.status(500).json({ error: err.message });
    }
}

export default {
    login,
    loginSubmit,
    register,
    registerSubmit
}