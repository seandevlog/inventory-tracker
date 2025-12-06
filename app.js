import express from 'express';
import mongoose from 'mongoose';
import expressEjsLayouts from 'express-ejs-layouts';
import {v2 as cloudinary} from 'cloudinary';

import config from './config/index.js';
import auth from './common/middlewares/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import cloudinaryApi from './common/utils/cloudinary.api.js';

import { flashMiddleware } from './common/middlewares/flashMiddleware.js';

export const app = express();

mongoose.connect(config.database);
cloudinary.config(config.cloud);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flashMiddleware);

app.get('/', (req, res) => res.send('Homepage'))

app.use('/auth', auth);

app.use('/users', users);

app.use('/api/cloudinary', cloudinaryApi);