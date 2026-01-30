import express from 'express';
import multer from 'multer';
import * as controller from './location.controllers.js';

import isAuthenticated from '#middlewares/isAuthenticated.js';
import isActive from '#middlewares/isActive.js';

const router = express.Router();
const upload = multer();

router.get('/', isActive, controller.getAllLocation);

router.post('/store', upload.any(), isAuthenticated, isActive, controller.storeLocation);

router.get('/:id', isAuthenticated, isActive, controller.getLocation);

router.patch('/:id', upload.any(), isAuthenticated, isActive, controller.updateLocation);

router.delete('/:id', isAuthenticated, isActive, controller.deleteLocation);

export default router;