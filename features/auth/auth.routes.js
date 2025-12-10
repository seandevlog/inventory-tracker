import express from 'express';
import multer from 'multer';;

import * as controller from './auth.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/login', controller.login);

router.post('/auth/login', upload.any(), controller.loginSubmit);

router.get('/register', controller.register);

router.post('/auth/register', upload.any(), controller.registerSubmit);

export default router;