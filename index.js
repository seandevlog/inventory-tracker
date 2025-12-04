import express from 'express';
import mongoose from 'mongoose';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';

import { loginController } from './controllers/loginController.js';
import { loginUserController } from './controllers/loginUserController.js'
import { registerController } from './controllers/registerController.js';
import { registerUserController } from './controllers/registerUserController.js';
import { usersController } from './controllers/usersController.js';
import { storeUserController } from './controllers/storeUserController.js';
import { getUserController } from './controllers/getUserController.js';
import { updateUserController } from './controllers/updateUserController.js';
import { deleteUserController } from './controllers/deleteUserController.js';

import { flashMiddleware } from './middlewares/flashMiddleware.js';
import { validateLoginMiddleware } from './middlewares/validateLoginMiddleware.js';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const upload = multer();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}))
app.use(flashMiddleware);

const port = process.env.PORT;

app.get('/', (req, res) => res.send('Homepage'))

app.get('/login', loginController);

app.get('/register', registerController);

app.post('/login/user', validateLoginMiddleware, loginUserController);

app.post('/register/user', registerUserController)

// TODO - add authorization
// TODO - divide into mini-apps
app.get('/users', usersController);

app.post('/users/store', upload.any(), storeUserController);

app.get('/users/:username', getUserController);

app.patch('/users/:username', upload.any(), updateUserController);

app.delete('/users/:username', upload.any(), deleteUserController);

app.get('/api/cloudinary/upload-signature', (req, res) => { 
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

app.get('/api/cloudinary/upload-signature/replace', (req, res) => {
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})