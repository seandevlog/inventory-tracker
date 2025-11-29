import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    // id: String (automatically generated)
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    givenName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;