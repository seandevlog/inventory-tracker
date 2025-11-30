import express from 'express';
import mongoose from 'mongoose';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import dotenv from 'dotenv';

import { loginController } from './controllers/loginController.js';
import { loginUserController } from './controllers/loginUserController.js'
import { registerController } from './controllers/registerController.js';
import { registerUserController } from './controllers/registerUserController.js';
import { usersController } from './controllers/usersController.js';
import { storeUserController } from './controllers/storeUserController.js';

import { flashMiddleware } from './middlewares/flashMiddleware.js';
import { validateLoginMiddleware } from './middlewares/validateLoginMiddleware.js';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
}))
app.use(flashMiddleware);

const port = process.env.PORT;

app.get('/', (req, res) => res.send('Homepage'))

app.get('/login', loginController);

app.get('/register', registerController);

app.post('/login/user', validateLoginMiddleware, loginUserController);

app.post('/register/user', registerUserController)

app.get('/users', usersController);

app.post('/users/store', storeUserController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})