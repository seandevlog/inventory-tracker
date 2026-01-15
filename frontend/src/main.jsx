import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './Root';
import Error from './pages/Error';
import Auth from './pages/Auth';
import Login, {action as loginAction} from './features/auth/Login';
import Register from './features/auth/Register/Register'
import Users from './features/users/Users';
import CreateUser from './features/users/CreateUser';
import ViewUser from './features/users/ViewUser';
import { 
  getAll as getAllUserLoader,
  get as getUserLoader
} from './features/users/users.loaders';
import {
  create as createUserAction
} from './features/users/users.actions';
import Manage from './pages/Manage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            element: <Auth />,
            children: [
              {
                path: 'login',
                element: <Login />,
                action: loginAction
              },
              {
                path: 'register',
                element: <Register />
              }
            ]
          },
          {
            element: <Manage />,
            children: [
              {
                path: 'users/',
                element: <Users />,
                loader: getAllUserLoader,
                children: [
                  {
                    path: 'create/',
                    element: <CreateUser />,
                    action: createUserAction
                  },
                  {
                    path: ':userId/',
                    element: <ViewUser />,
                    loader: getUserLoader,
                  }
                ] 
              }
            ]
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
