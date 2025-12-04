import User from '../models/Users.js';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const updateUserController = async (req, res) => {
    try {
        try {
            await User.findOneAndUpdate({ username: req.params.username }, {
                ...req.body
            });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to find and update user' });
        }
        
        // did not use res.redirect since it's not commonly used with patch request and doesn't work
        res.send({ redirect: '/users' });
    } catch (err) {
        const errors = {}
        Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message);
        res.send({
            errors: errors
        })
    }
}