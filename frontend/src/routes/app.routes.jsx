import { redirect } from 'react-router-dom';

import App from '@pages/app/app';

import manageRoutes from '@routes/app/manage.routes';
import profileRoutes from '@routes/app/profile.routes';
import faqRoutes from '@routes/app/faq.routes';

import {
  logout as logoutLoader
} from '@features/auth/loaders';

import config from '@config';
const { path } = config;

const app = {
  id: path.app,
  path: path.app,
  Component: App,
  ErrorBoundary: Error,
  children: [
    { index: true, loader: () => redirect(path.manage.absolute)},
    profileRoutes,
    manageRoutes,
    faqRoutes,
    { 
      path: path.logout.relative, 
      Component: () => (<></>), 
      loader: logoutLoader 
    },
  ]
}

export default app;