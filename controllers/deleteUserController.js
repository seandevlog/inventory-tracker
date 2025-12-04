import User from '../models/Users.js';
import {v2 as cloudinary} from 'cloudinary';

export const deleteUserController = async (req, res) => {
    try {
        // TODO - debug only profile is being deleted and not the user document in the database
        const user = await User.findOneAndDelete({ username: req.params.username });
        if (!user) throw new Error(`Failed to find and delete ${req.params.username}`);

        if (user?.profile.public_id) {
            const cloudinaryRes = await cloudinary.uploader.destroy( 
                user.profile.public_id
            );
            if (!cloudinaryRes.ok) throw new Error(`Cloudinary Error: Failed to destroy ${user.profile.public_id} from cloud`);
        }
        
        // did not use res.redirect since it's not commonly used with delete request and doesn't work
        res.send({ redirect: '/users' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
    
}