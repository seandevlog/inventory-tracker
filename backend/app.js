import express from 'express';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config/index.js';
import auth from './features/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import cloudinaryApi from './features/files/cloudinary.api.js';
import isAuthenticated from './common/middlewares/isAuthenticated.js';

export const app = express();

mongoose.connect(config.database);
cloudinary.config(config.cloud);

const whitelistOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelistOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', auth);

app.use('/users', isAuthenticated, users);

app.use('/api/cloudinary', cloudinaryApi);