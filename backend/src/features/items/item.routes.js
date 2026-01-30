import express from 'express';
import multer from 'multer';
import * as controller from './item.controllers.js';
import isAuthenticated from '#middlewares/isAuthenticated.js';
import isActive from '#middlewares/isActive.js';

const router = express.Router();
const upload = multer();

router.get('/', isActive, controller.getAllItem);

router.post('/store', isAuthenticated, isActive, upload.any(), controller.storeItem);

router.get('/:id', isAuthenticated, isActive, controller.getItem);

router.patch('/:id', isAuthenticated, isActive, upload.any(), controller.updateItem);

router.delete('/:id', isAuthenticated, isActive, controller.deleteItem);

export default router;