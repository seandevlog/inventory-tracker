import express from 'express';
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config.js';

import auth from './features/auth/auth.routes.js';
import users from './features/users/user.routes.js';
import items from './features/items/item.routes.js';
import locations from './features/locations/location.routes.js';
import suppliers from './features/suppliers/supplier.routes.js';
import orders from './features/orders/order.routes.js';
import transactions from './features/transactions/transaction.routes.js';

import cloudinaryApi from './features/files/cloudinary.api.routes.js';
import profile from './features/profile/profile.routes.js';

import isAuthenticated from '#middlewares/isAuthenticated.js';
import errorHandler from '#middlewares/errorHandler.js';
import databaseHandler from '#middlewares/databaseHandler.js';
import isActive from '#middlewares/isActive.js';
import isAdmin from '#middlewares/isAdmin.js';

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

app.use('/profile', isActive, profile);

app.use('/users', users);

app.use('/items', items);

app.use('/locations', locations);

app.use('/suppliers', suppliers);

app.use('/orders', isAuthenticated, isActive, orders);

app.use('/transactions', isAuthenticated, isActive, transactions);

app.use('/api/cloudinary', cloudinaryApi);

app.use(errorHandler)