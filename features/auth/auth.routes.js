import express from 'express';

import * as controller from './auth.controllers.js';
import validateLogin from '../../middlewares/validateLogin.js';

const router = express.Router();

router.get('/auth/login', controller.login);

router.get('/auth/register', controller.register);

router.post('/auth/login/user', validateLogin, controller.loginUser);

router.post('/auth/register/user', controller.registerUser);

export default router;