import express from 'express';
import mongoose from 'mongoose';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

import auth from './features/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import cloudinaryApi from './lib/cloudinary.api.js';

import { flashMiddleware } from './middlewares/flashMiddleware.js';

export const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

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

app.get('/', (req, res) => res.send('Homepage'))

app.use('/auth', auth);

app.use('/users', users);

app.use('/api/cloudinary', cloudinaryApi);