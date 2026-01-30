import express from 'express';
import multer from 'multer';
import * as controller from './transaction.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllTransaction);

router.post('/store', upload.any(), controller.storeTransaction);

router.get('/:id', controller.getTransaction);

router.patch('/:id', upload.any(), controller.updateTransaction);

router.delete('/:id', controller.deleteTransaction);

export default router;