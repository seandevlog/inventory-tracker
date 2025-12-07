import {v2 as cloudinary} from 'cloudinary';
import * as service from './user.services.js';

export const renderUsers = async (req, res) => {
    const users = await service.getAllUser();

    res.render('users', {
        title: 'Users',
        users: users,
        layout: 'layouts/manage'
    });
}

export const storeUser = async (req, res) => {
    try {
        const user = service.storeUser({ ...req.body });

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
        user = await service.getUser({ username: req.params.username });
    } catch (err) {
        if (err.errors)
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
            await service.updateUser({ username: req.params.username }, {
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
        const user = await service.deleteUser({ username: req.params.username });
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