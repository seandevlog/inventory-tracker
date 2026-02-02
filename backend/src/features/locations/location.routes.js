import express from 'express';
import multer from 'multer';
import * as controller from './location.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllLocation);

router.post('/store', upload.any(), controller.storeLocation);

router.get('/:id', controller.getLocation);

router.patch('/:id', upload.any(), controller.updateLocation);

router.delete('/:id', controller.deleteLocation);

export default router;