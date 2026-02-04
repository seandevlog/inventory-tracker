import express from 'express';
import multer from 'multer';
import * as controller from './order.controllers.js';
import isManager from '#middlewares/isManager.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllOrder);

router.post('/store', upload.any(), controller.storeOrder);

router.get('/:id', controller.getOrder);

router.patch('/:id', isManager, upload.any(), controller.updateOrder);

router.delete('/:id', isManager, controller.deleteOrder);

export default router;