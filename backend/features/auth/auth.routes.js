import express from 'express';
import multer from 'multer';;

import * as controller from './auth.controllers.js';

const router = express.Router();
const upload = multer();

router.post('/login', upload.any(), controller.loginSubmit);

router.post('/register', upload.any(), controller.registerSubmit);

// router.post('/refresh', controller.refresh);

// router.post('/auth/logout', controller.logout);

export default router;