import Sessions from './session.model.js';
import Config from '#config';
import mongoose from 'mongoose';

const get = async ({ hashedToken }) => {
    if (!hashedToken) throw new Error('Hashed Token is required');

    const session = await Sessions.findOne({ hashedToken }).lean();

    if (!session) throw new Error('Session not found');

    return session;
}

const create = async ({ userId, hashedToken }) => {
    if (!userId) throw new Error('User ID is required');
    if (!hashedToken) throw new Error('Hashed Token is required');

    const session = await Sessions.create({ 
        userId, 
        hashedToken, 
        expiresIn: new Date(Date.now() + Config.sessionTimeoutMs)
    })
    
    if (!session) throw new Error('Failed to create session');
    return session;
}

const destroy = async ({ hashedToken }) => {
    if (!hashedToken) throw new Error('Hashed Token is required');

    const session = await Sessions.findOneAndDelete({ hashedToken });
    if (!session) throw new Error('Failed to delete session');

    return session;
}

const destroyAll = async ({ userId }) => {
    if (!userId) throw new Error('User ID is required');

    const { acknowledged } = await Sessions.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });

    if (!acknowledged) throw new Error('Failed to delete sessions');
}

export default {
    get,
    create,
    destroy,
    destroyAll,
}


