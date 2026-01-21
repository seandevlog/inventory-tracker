import express from 'express';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config.js';

import auth from './features/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import cloudinaryApi from './features/files/cloudinary.api.routes.js';

import isAuthenticated from '#middlewares/isAuthenticated.js';
import errorHandler from '#middlewares/errorHandler.js';
import databaseHandler from '#middlewares/databaseHandler.js';

export const app = express();

mongoose.connect(config.database);
cloudinary.config(config.cloud);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || config.whitelistOrigins.includes(origin)) {
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

app.use(databaseHandler);

app.use('/auth', auth);

app.use('/users', isAuthenticated, users);

app.use('/api/cloudinary', cloudinaryApi);

app.use(errorHandler)