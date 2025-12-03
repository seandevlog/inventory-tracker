import User from '../models/Users.js';
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const updateUserController = async (req, res) => {
    try {
        const fileUploadResponse = await cloudinary.uploader.upload(req.file.path);

        fs.unlinkSync(req.file.path); // delete local temp file

        await User.findOneAndUpdate({ username: req.params.username }, {
            username: req.body.username,
            password: req.body.password,
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            contact: req.body.contact,
            address: req.body.address,
            status: req.body.status,
            imageUrl: fileUploadResponse.secure_url
        });
        // did not use res.redirect since it's not commonly used with patch request and doesn't work
        res.send({ 
            redirect: '/users',
            publicId: fileUploadResponse.public_id,
            url: fileUploadResponse.secure_url 
        });
    } catch (err) {
        const errors = {}
        Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message);
        res.send({
            errors: errors
        })
    }
}