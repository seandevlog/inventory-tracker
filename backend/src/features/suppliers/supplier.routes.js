import express from 'express';
import multer from 'multer';
import * as controller from './supplier.controllers.js';
import isAuthenticated from '#middlewares/isAuthenticated.js';
import isActive from '#middlewares/isActive.js';

const router = express.Router();
const upload = multer();

router.get('/', isActive, controller.getAllSupplier);

router.post('/store', isAuthenticated, isActive, upload.any(), controller.storeSupplier);

router.get('/:id', isAuthenticated, isActive, isAuthenticated, controller.getSupplier);

router.patch('/:id', isAuthenticated, isActive, upload.any(), isAuthenticated, controller.updateSupplier);

router.delete('/:id', isAuthenticated, isActive, controller.deleteSupplier);

export default router;