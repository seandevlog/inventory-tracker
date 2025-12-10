import mongoose from 'mongoose';
const { Schema } = mongoose;

const sessionSchema = new Schema({
    hashedToken: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        rel: 'User'
    },
    expiresAt: Date
})

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;