import express from 'express';
import multer from 'multer';
import * as controller from './item.controllers.js';
import isManager from '#middlewares/isManager.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllItem);

router.post('/store', isManager, upload.any(), controller.storeItem);

router.get('/:id', controller.getItem);

router.patch('/:id', isManager, upload.any(), controller.updateItem);

router.delete('/:id', isManager, controller.deleteItem);

export default router;