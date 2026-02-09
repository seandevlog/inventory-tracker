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

import authenticate from '#middlewares/authenticate.js';
import errorHandler from '#middlewares/errorHandler.js';
import databaseHandler from '#middlewares/databaseHandler.js';
import isActive from '#middlewares/isActive.js';
import isAdmin from '#middlewares/isAdmin.js';

export const app = express();

mongoose.connect(config.database);
cloudinary.config(config.cloud);

app.set('trust proxy', 1)
app.use(cors({
  origin: config.nodeEnv === 'production' ? config.client : 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(databaseHandler);

app.use('/auth', auth);

app.use('/profile', authenticate, isActive, profile);

app.use('/users', authenticate, isActive, isAdmin, users);

app.use('/items', authenticate, isActive, items);

app.use('/locations', authenticate, isActive, locations);

app.use('/suppliers', authenticate, isActive, suppliers);

app.use('/orders', authenticate, isActive, orders);

app.use('/transactions', authenticate, isActive, transactions);

app.use('/api/cloudinary', cloudinaryApi);

app.use(errorHandler)