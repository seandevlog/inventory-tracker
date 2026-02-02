import express from 'express';
import multer from 'multer';
import * as controller from './item.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllItem);

router.post('/store', upload.any(), controller.storeItem);

router.get('/:id', controller.getItem);

router.patch('/:id', upload.any(), controller.updateItem);

router.delete('/:id', controller.deleteItem);

export default router;