import Sessions from '../models/session.model.js';
import Config from '../../../config/index.js';
import mongoose from 'mongoose';

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

const destroyAll = async ({ userId }) => {
    try {
        const { acknowledged } = await Sessions.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });

        if (!acknowledged) throw new Error('Failed to delete sessions');
    } catch (err) {
        console.log(err);
    }
    
}

const findWithHashedToken = async (hashedToken) => {
    const session = await Sessions.findOne({ hashedToken });

    return session;
}

export default {
    create,
    destroy,
    destroyAll,
    findWithHashedToken
}


