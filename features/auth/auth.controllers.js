import Auth from './services/auth.services.js';
import Tokens from './services/token.services.js';
import Sessions from './services/session.services.js';
import Config from '../../config/index.js';
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
        const { _id: userId } = await Auth.login({ ...req.body });
        const { accessToken, refreshToken, hashedToken } = Tokens.generate(userId);
        const session = Sessions.create({ userId, hashedToken });
        if (!session) throw new Error('Failed to create session');

        res.cookie('refreshToken', refreshToken, {
            expires: new Date(session.expiresIn).getTime(),
            httpOnly: true,
            secure: Config.nodeEnv === 'production',
            sameSite: 'strict'
        })

        res.status(200).json({ 
            redirect: '/users',
            accessToken
        });
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
        await Auth.register({ ...req.body });
        res.status(200).json({ redirect: '/login' });
    } catch (err) {;
        return res.status(500).json({ error: err.message });
    }
}

export const refresh = async (req, res) => {
    const hashedToken = Tokens.hash(req.cookies.refreshToken);
    const session = await Sessions.findWithHashedToken(hashedToken);
    
    if (!session) return res.status(401).json({ error: 'Invalid Token' });

    if (session.expiresIn.getTime() < Date.now()) return res.status(403).json({ redirect: '/login'});

    await Sessions.destroy({ hashedToken });

    const { userId } = session;
    const { 
        accessToken, 
        refreshToken, 
        hashedToken: newHashedToken 
    } = Tokens.generate(userId);

    const newSession = await Sessions.create({ userId, hashedToken: newHashedToken });

    res.cookie('refreshToken', refreshToken, {
        expires: newSession.expiresIn.getTime(),
        httpOnly: true,
        secure: Config.nodeEnv === 'production',
        sameSite: 'strict'
    })

    res.status(200).json({ accessToken });
}

// TODO - finish logout function and EJS generation
const logout = async (req, res) => {
    const hashedToken = Tokens.hash(req.cookies.refreshToken);
    const session = await Sessions.findWithHashedToken(hashedToken);
    
    if (!session) return res.status(401).json({ error: 'Invalid Token' });

    if (session.expiresIn.getTime() < Date.now()) return res.status(403).json({ redirect: '/login'});

    await Sessions.destroy({ hashedToken });

    await Sessions.destroy();
}

export default {
    login,
    loginSubmit,
    register,
    registerSubmit,
    refresh,
    logout
}