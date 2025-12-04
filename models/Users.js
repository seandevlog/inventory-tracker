import mongoose from 'mongoose';
const { Schema } = mongoose;

const profileSchema = new Schema({
    url: {
        type: String
    },
    public_id: {
        type: String
    },
    _id: false
});

const userSchema = new Schema({
    // id: String (automatically generated)
    username: {
        type: String,
        required: [ true, 'Username is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        minlength: [ 12, 'Password should have 12 or more characters'],
        validate: {
            validator: function(x) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/.test(x);
            },
            message: 'Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols'
        }
    },
    givenName: {
        type: String,
        required: [ true, 'Given Name is required' ]
    },
    familyName: {
        type: String,
        required: [ true, 'Family Name is required' ]
    },
    contact: {
        type: String,
        required: [ true, 'Contact is required' ]
    },
    address: {
        type: String,
        required: [ true, 'Address is required' ]
    },
    status: {
        type: String,
        required: [ true, 'Status is required' ]
    },
    profile: profileSchema
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);
export default userModel;