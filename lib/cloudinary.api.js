import express from 'express';
import { v2 as cloudinary } from "cloudinary";
const router = express.Router();

router.get('/upload-signature', (req, res) => { 
    try {
        const timestamp = Math.round(Date.now() / 1000);
        const folder = 'users/profile_pics';

        const paramsToSign = {
            timestamp,
            upload_preset: process.env.UPLOAD_PRESET,
            folder
        }

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );
        
        res.json({
            timestamp,
            signature,
            cloudName: process.env.CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            uploadPreset: process.env.UPLOAD_PRESET,
            folder
        }) 
    } catch (err) {
        res.status(500).json({ error: 'Failed to create signature' });
    }
});

router.get('/upload-signature/replace', (req, res) => {
    try {
        const { publicId } = req.query;
        if (!publicId) return res.status(400).json({ error: 'publicId is required' });

        const timestamp = Math.round(Date.now() /1000);

        const paramsToSign = {
            timestamp,
            upload_preset: process.env.UPLOAD_PRESET,
            public_id: publicId,
            overwrite: true,
            invalidate: true
        }

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        )

        res.json({
            timestamp,
            signature,
            cloudName: process.env.CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            uploadPreset: process.env.UPLOAD_PRESET,
            publicId,
            overwrite: true,
            invalidate: true
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create replace signature' });
    }
})

export default router;