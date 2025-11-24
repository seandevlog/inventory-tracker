import mongoose from 'mongoose';

const userSchema = new Schema({
    // id: String (automatically generated)
    email: String,
    password: String,
    givenName: String,
    lastName: String,
    contact: String,
    address: String
});

export const userModel = mongoose.model('User', userSchema);