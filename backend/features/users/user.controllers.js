import {v2 as cloudinary} from 'cloudinary';
import * as service from './user.services.js';

export const getAllUser = async (req, res) => {
    try {
        const users = await service.getAllUser();

        return res.status(200).json({ users });
    } catch (err) {
        return res.status(404).json({ err: err.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await service.getUser({ _id: req.params.id });

        return res.status(200).json({ user });
    } catch (err) {
        return res.status(404).json({ error: err.message });
    }
}

export const storeUser = async (req, res) => {
    try {
        await service.storeUser({ ...req.body });

        res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await service.updateUser({ _id: req.params.id }, { ...req.body });
        if (!user) throw new Error ('Failed to find and update user');
        
        res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).send({ errors: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await service.deleteUser({ _id: req.params.id });
        if (!user) throw new Error(`Failed to find and delete ${ req.params.id }`);

        if (user.profile?.public_id) {
            const cloudinaryRes = await cloudinary.uploader.destroy( 
                user.profile.public_id
            );
            if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${user.profile.public_id} from cloud`);
        }
        
        res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}