import Sessions from '../models/session.model.js';
import Config from '../../../config/index.js';

const create = async ({ userId, hashedToken }) => {
    const session = await Sessions.create({ 
        userId, 
        hashedToken, 
        expiresIn: new Date(Date.now() + Config.sessionTimeoutMs)
    })
    if (!session) throw new Error('Failed to create session');
    return session;
}

const destroy = async ({ hashedToken }) => {
    const session = await Sessions.findOneAndDelete({ hashedToken });
    if (!session) throw new Error('Failed to delete session');
    return session;
}

const findWithHashedToken = async (hashedToken) => {
    const session = await Sessions.findOne({ hashedToken });
    if (!session) throw new Error('Failed to find session');
    return session;
}

export default {
    create,
    destroy,
    findWithHashedToken
}


