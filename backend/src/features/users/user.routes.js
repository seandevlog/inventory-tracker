import express from 'express';
import multer from 'multer';
import * as controller from './user.controllers.js';

import isActive from '#middlewares/isActive.js';
import isAdmin from '#middlewares/isAdmin.js';
import isAuthenticated from '#middlewares/isAuthenticated.js';

const router = express.Router();
const upload = multer();

router.get('/', isActive, controller.getAllUser);

router.post('/store', upload.any(), isAuthenticated, isActive, isAdmin, controller.storeUser);

router.get('/:id', isAuthenticated, isActive, isAdmin, controller.getUser);

router.patch('/:id', upload.any(), isAuthenticated, isActive, isAdmin, controller.updateUser);

router.delete('/:id', isAuthenticated, isActive, isAdmin, controller.deleteUser);

export default router;