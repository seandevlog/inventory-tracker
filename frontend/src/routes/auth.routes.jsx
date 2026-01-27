import Auth from '@pages/auth/auth';
import Login from '@features/auth/login';
import Register from '@features/auth/register'

import {
  loginSubmit as loginAction,
  registerSubmit as registerAction
} from '@features/auth/actions';

import isLoggedInMiddleware from '@middlewares/isLoggedIn';

const auth = {
  Component: Auth,
  // middleware: [isLoggedInMiddleware],
  loader: isLoggedInMiddleware,
  children: [
    { 
      index: true, 
      Component: Login, 
      action: loginAction 
    },
    { 
      path: 'register', 
      Component: Register, 
      action: registerAction 
    }
  ]
}

export default auth;