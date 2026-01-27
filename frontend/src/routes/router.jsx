import { createBrowserRouter } from 'react-router-dom';
import '@assets/global.css';

import Root from '../root';
import Hydrate from '../hydrate';
import Error from '@pages/error/error';

import authRoutes from '@routes/auth.routes';
import profileRoutes from '@routes/profile.routes';
import manageRoutes from '@routes/manage/manage.routes';

import {
  logout as logoutLoader
} from '@features/auth/loaders';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: Error,
    HydrateFallback: Hydrate,
    children: [
      authRoutes,
      profileRoutes,
      manageRoutes,
      { 
        path: 'logout', 
        Component: () => (<></>), 
        loader: logoutLoader 
      },
    ]
  }
]);

export default router;