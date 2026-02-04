import express from 'express';
import multer from 'multer';
import * as controller from './supplier.controllers.js';
import isManager from '#middlewares/isManager.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllSupplier);

router.post('/store', isManager, upload.any(), controller.storeSupplier);

router.get('/:id', controller.getSupplier);

router.patch('/:id', isManager, upload.any(), controller.updateSupplier);

router.delete('/:id', isManager, controller.deleteSupplier);

export default router;