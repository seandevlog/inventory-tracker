import Auth from './services/auth.services.js';
import Tokens from './services/token.services.js';
import Sessions from './services/session.services.js';
import Config from '../../config/index.js';
// TODO - differentiate server-side validation and authentication, and authorization
// ! Do not return server-side validation to the user

export const loginSubmit = async (req, res) => {
    try {
        const { _id: userId } = await Auth.login({ ...req.body });
        const { accessToken, refreshToken, hashedToken } = Tokens.generate(userId);
        const session = Sessions.create({ userId, hashedToken });
        if (!session) throw new Error('Failed to create session');

        res.cookie('refreshToken', refreshToken, {
            expires: session.expiresIn,
            httpOnly: true,
            secure: Config.nodeEnv === 'production',
            sameSite: Config.nodeEnv === 'production' ? 'none': 'lax'
        })
        res.status(200).json({ 
            success: true,
            accessToken
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const registerSubmit = async (req, res) => {
    try {
        await Auth.register({ ...req.body });
        res.status(200).json({ success: true });
    } catch (err) {;
        return res.status(500).json({ error: err.message });
    }
}

export const refresh = async (req, res) => {
    try {
        const hashedToken = req.cookies?.refreshToken && Tokens.hash(req.cookies.refreshToken);
        const session = hashedToken && await Sessions.findWithHashedToken(hashedToken);
        
        if (!session) return res.status(401).json({ error: 'Invalid Token' });

        if (session.expiresIn.getTime() < Date.now()) return res.status(403).json({ error: 'Token Expired' });

        await Sessions.destroy({ hashedToken });

        const { userId } = session;
        const { 
            accessToken, 
            refreshToken, 
            hashedToken: newHashedToken 
        } = Tokens.generate(userId);

        const newSession = await Sessions.create({ userId, hashedToken: newHashedToken });

        res.cookie('refreshToken', refreshToken, {
            expires: newSession.expiresIn,
            httpOnly: true,
            secure: Config.nodeEnv === 'production',
            sameSite: Config.nodeEnv === 'production' ? 'none': 'lax'
        })

        res.status(200).json({ 
            success: true,    
            accessToken 
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
}

// TODO - finish logout function and EJS generation
// const logout = async (req, res) => {
//     const hashedToken = Tokens.hash(req.cookies.refreshToken);
//     const session = await Sessions.findWithHashedToken(hashedToken);
    
//     if (!session) return res.status(401).json({ error: 'Invalid Token' });

//     if (session.expiresIn.getTime() < Date.now()) return res.status(403).json({ redirect: '/login'});

//     await Sessions.destroy({ hashedToken });

//     await Sessions.destroy();
// }

export default {
    loginSubmit,
    registerSubmit,
    refresh,
    // logout
}