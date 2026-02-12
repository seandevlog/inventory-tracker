import App from '@pages/app/app';
import Home from '@pages/app/home/home'

import manageRoutes from '@routes/app/manage.routes';
import profileRoutes from '@routes/app/profile.routes';
import faqRoutes from '@routes/app/faq.routes';

import {
  logout as logoutLoader
} from '@features/auth/loaders';

import config from '@config';
const { path } = config;

const app = {
  id: path.app.relative,
  path: path.app.relative,
  Component: App,
  ErrorBoundary: Error,
  children: [
    { index: true, Component: Home },
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