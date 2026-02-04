import express from 'express';
import multer from 'multer';
import * as controller from './location.controllers.js';
import isManager from '#middlewares/isManager.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllLocation);

router.post('/store', isManager, upload.any(), controller.storeLocation);

router.get('/:id', controller.getLocation);

router.patch('/:id', isManager, upload.any(), controller.updateLocation);

router.delete('/:id', isManager, controller.deleteLocation);

export default router;