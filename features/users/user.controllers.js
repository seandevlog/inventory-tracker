import Users from "./user.model.js";
import {v2 as cloudinary} from 'cloudinary';

export const renderUsers = async (req, res) => {
    const users = await Users.find({});

    res.render('users', {
        title: 'Users',
        users: users,
        layout: 'layouts/manage'
    });
}

export const storeUser = async (req, res) => {
    try {
        const user = await Users.create({ ...req.body });
        if (!user) throw new Error('Failed to create user');

        // I did not use res.redirect since redirecting directly to /users would return a json response that has html 
        // since we render html in /users, and the client needs to get the response data to receive the errors
        res.send({ redirect: '/users' });
    } catch (err) {
        if (err.message === 'Failed to create user') return res.status(500).json({ error: err.message });

        const errors = {}
        Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message);
        res.json({
            body: req.body,
            errors: errors
        });
    }
}

export const getUser = async (req, res) => {
    let user, errors;
    try {
        user = await Users.findOne({ username: req.params.username })
    } catch (err) {
        errors = Object.keys(err.errors).map(key => errors[err.errors[key].path] = err.errors[key].message); 
    }
    res.send({
        user: user,
        errors: errors
    });
}

export const updateUser = async (req, res) => {
    try {
        try {
            await Users.findOneAndUpdate({ username: req.params.username }, {
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

export const deleteUser = async (req, res) => {
    try {
        const user = await Users.findOneAndDelete({ username: req.params.username });
        if (!user) throw new Error(`Failed to find and delete ${req.params.username}`);

        if (user?.profile.public_id) {
            const cloudinaryRes = await cloudinary.uploader.destroy( 
                user.profile.public_id
            );
            if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${user.profile.public_id} from cloud`);
        }
        
        // did not use res.redirect since it's not commonly used with delete request and doesn't work
        res.json({ redirect: '/users' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}