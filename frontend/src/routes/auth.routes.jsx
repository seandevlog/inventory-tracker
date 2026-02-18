import Auth from '@pages/auth/auth';
import Login from '@features/auth/login';
import Register from '@features/auth/register'

import {
  loginSubmit as loginAction,
  registerSubmit as registerAction
} from '@features/auth/actions';

import config from '@config';
const { path } = config;

const auth = {
  id: path.auth.relative,
  path: path.auth.relative,
  Component: Auth,
  ErrorBoundary: Error,
  children: [
    { 
      index: true, 
      Component: Login, 
      action: loginAction 
    },
    { 
      path: path.register.relative, 
      Component: Register, 
      action: registerAction 
    }
  ]
}

export default auth;