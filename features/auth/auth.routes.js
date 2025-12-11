import express from 'express';
import multer from 'multer';;

import * as controller from './auth.controllers.js';

const router = express.Router();
const upload = multer();

router.get('/login', controller.login);

router.post('/auth/login', upload.any(), controller.loginSubmit);

router.get('/register', controller.register);

router.post('/auth/register', upload.any(), controller.registerSubmit);

router.post('/auth/refresh', controller.refresh);

// router.post('/auth/logout', controller.logout);

export default router;