import express from 'express';
import multer from 'multer';
import * as controller from './user.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/', controller.getAllUser);

router.post('/store', upload.any(), controller.storeUser);

router.get('/:id', controller.getUser);

router.patch('/:id', upload.any(), controller.updateUser);

router.delete('/:id', controller.deleteUser);

export default router;