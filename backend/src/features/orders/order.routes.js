import express from 'express';
import multer from 'multer';
import * as controller from './order.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllOrder);

router.post('/store', upload.any(), controller.storeOrder);

router.get('/:id', controller.getOrder);

router.patch('/:id', upload.any(), controller.updateOrder);

router.delete('/:id', controller.deleteOrder);

export default router;