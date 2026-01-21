import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import Manage from './routes/manage'
import Error from './routes/error';
import Auth from './routes/auth';
import Login from '@features/auth/Login';
import Register from '@features/auth/Register'
import Users from '@features/users/Users';
import UserModal from '@features/users/UsersModal';

import {
  auth as authLoader,
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Login />,
            action: loginAction,
            loader: authLoader
          },
          {
            path: 'register',
            element: <Register />,
            action: registerAction,
            loader: authLoader
          }
        ]
      },
      {
        path: 'logout',
        element: <></>,
        loader: logoutLoader
      },
      {
        element: <Manage />,
        children: [
          {
            id: 'users',
            path: 'users/',
            element: <Users />,
            loader: getAllUserLoader,
            children: [
              {
                path: 'create/',
                element: <UserModal mode='create'/>,
                action: createUserAction
              },
              {
                path: ':userId/',
                element: <UserModal mode='view'/>,
                action: viewUserAction
              },
              {
                path: ':userId/edit/',
                element: <UserModal mode='edit'/>,
                action: editUserAction
              }  
            ]
          }
        ]
      }
    ]
  }
]);

export default router;