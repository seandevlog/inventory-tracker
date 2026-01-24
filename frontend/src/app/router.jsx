import { createBrowserRouter } from 'react-router-dom';
import './index.css';

import Root from './root';
import Hydrate from './hydrate';

import authRoutes from './routes/routes.auth';
import profileRoutes from './routes/routes.profile';
import manageRoutes from './routes/routes.manage';

import {
  logout as logoutLoader
} from '@features/auth/auth.loaders';

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
      { path: 'logout', Component: <></>, loader: logoutLoader },
    ]
  }
]);

export default router;