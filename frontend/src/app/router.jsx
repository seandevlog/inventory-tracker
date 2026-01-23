import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import Hydrate from './routes/hydrate';
import Dashboard from './routes/dashboard';
import Manage from './routes/manage'
import Error from './routes/error';
import Auth from './routes/auth';
import Login from '@features/auth/Login';
import Register from '@features/auth/Register'
import Users from '@features/users/Users';
import Modal from '@components/modal/modal';

import {
  logout as logoutLoader
} from '@features/auth/auth.loaders';
import {
  loginSubmit as loginAction,
  registerSubmit as registerAction
} from '@features/auth/auth.actions';

import { 
  getAll as getAllUserLoader
} from '@features/users/users.loaders';
import {
  create as createUserAction,
  view as viewUserAction,
  edit as editUserAction
} from '@features/users/users.actions';

import pageRefreshMiddleware from '@middlewares/pageRefresh';
import isLoggedInMiddleware from '@middlewares/isLoggedIn';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: Error,
    HydrateFallback: Hydrate,
    children: [
      {
        Component: Auth,
        middleware: [isLoggedInMiddleware],
        children: [
          { index: true, Component: Login, action: loginAction },
          { path: 'register', Component: Register, action: registerAction }
        ]
      },
      {
        Component: Manage,
        middleware: [pageRefreshMiddleware],
        children: [
          { path: 'dashboard/', Component: Dashboard },
          {
            id: 'users',
            path: 'users/',
            Component: Users,
            loader: getAllUserLoader,
            children: [
              {
                path: 'create/',
                element: <Modal mode='create' title='Create User'/>,
                action: createUserAction
              },
              {
                path: ':userId/',
                element: <Modal mode='view' title='View User'/>,
                action: viewUserAction
              },
              {
                path: ':userId/edit/',
                element: <Modal mode='edit' title='Edit User'/>,
                action: editUserAction
              }  
            ]
          }
        ]
      },
      { path: 'logout', Component: <></>, loader: logoutLoader },
    ]
  }
]);

export default router;