import express from 'express';

import * as controller from './auth.controllers.js';

const router = express.Router();

router.get('/login', controller.login);

router.get('/auth/login', controller.loginSubmit);

router.get('/register', controller.register);

router.post('/auth/register', controller.registerSubmit);

export default router;