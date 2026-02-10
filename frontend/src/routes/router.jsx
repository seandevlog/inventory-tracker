import { createBrowserRouter } from 'react-router-dom';
import '@assets/global.css';

import Root from '../root';
import Hydrate from '../hydrate';
import Error from '@pages/error/error';

import authRoutes from '@routes/auth.routes';
import appRoutes from '@routes/app.routes';

import config from '@config';
const { path } = config;

const router = createBrowserRouter([
  {
    path: path.root,
    Component: Root,
    ErrorBoundary: Error,
    HydrateFallback: Hydrate,
    children: [
      authRoutes,
      appRoutes
    ]
  }
]);

export default router;