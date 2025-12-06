import express from 'express';
import multer from 'multer';

import * as controller from './user.controllers.js';

const router = express.Router();
const upload = multer();

// TODO - add authorization

router.get('/users', controller.renderUsers);

router.post('/users/store', upload.any(), controller.storeUser);

router.get('/users/:id', controller.getUser);

router.patch('/users/:id', upload.any(), controller.updateUser);

router.delete('/users/:id', controller.deleteUser);

export default router;