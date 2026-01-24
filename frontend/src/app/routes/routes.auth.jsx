import Auth from '@features/auth/auth';
import Login from '@features/auth/auth.login';
import Register from '@features/auth/auth.register'

import {
  loginSubmit as loginAction,
  registerSubmit as registerAction
} from '@features/auth/auth.actions';

import isLoggedInMiddleware from '@middlewares/isLoggedIn';

const auth = {
  Component: Auth,
  middleware: [isLoggedInMiddleware],
  children: [
    { index: true, Component: Login, action: loginAction },
    { path: 'register', Component: Register, action: registerAction }
  ]
}

export default auth;