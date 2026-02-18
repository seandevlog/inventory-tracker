import { createBrowserRouter } from 'react-router-dom';
import '@assets/global.css';

import App from '@pages/app/app';
import Home from '@pages/home/home';

import manageRoutes from '@routes/manage.routes';
import profileRoutes from '@routes/profile.routes';
import faqRoutes from '@routes/faq.routes';

import {
  logout as logoutLoader
} from '@features/auth/loaders';

import Hydrate from '@pages/hydrate/hydrate';
import Error from '@pages/error/error';

import authRoutes from '@routes/auth.routes';

import config from '@config';
const { path } = config;

const router = createBrowserRouter([
  {
    path: path.root,
    Component: App,
    ErrorBoundary: Error,
    HydrateFallback: Hydrate,
    children: [
      { index: true, Component: Home },
      profileRoutes,
      manageRoutes,
      faqRoutes,
      authRoutes,
    ]
  }
]);

export default router;