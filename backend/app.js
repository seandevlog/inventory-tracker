import express from 'express';
import mongoose from 'mongoose';
import expressEjsLayouts from 'express-ejs-layouts';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from 'cookie-parser';

import config from './config/index.js';
import auth from './features/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import cloudinaryApi from './features/files/cloudinary.api.js';
import { isAuthenticated } from './common/middlewares/isAuthenticated.js';

export const app = express();

mongoose.connect(config.database);
cloudinary.config(config.cloud);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => 
    res.render('home', {
        layout: 'layouts/home'
    }))

app.use('/', auth);

// TODO - add isAuthenticated after React integration unless try to store AT in httpOnly cookie

app.use('/users', users);

app.use('/api/cloudinary', cloudinaryApi);