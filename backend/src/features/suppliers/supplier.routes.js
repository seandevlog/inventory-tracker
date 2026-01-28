import express from 'express';
import multer from 'multer';
import * as controller from './supplier.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllSupplier);

router.post('/store', upload.any(), controller.storeSupplier);

router.get('/:id', controller.getSupplier);

router.patch('/:id', upload.any(), controller.updateSupplier);

router.delete('/:id', controller.deleteSupplier);

export default router;