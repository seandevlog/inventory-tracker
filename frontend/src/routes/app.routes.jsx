import App from '@pages/app/app';

import manageRoutes from '@routes/app/manage.routes';
import profileRoutes from '@routes/app/profile.routes';

import { loader as appLoader } from '@pages/app/loaders';

import {
  logout as logoutLoader
} from '@features/auth/loaders';

const app = {
  Component: App,
  loader: appLoader,
  children: [
    profileRoutes,
    manageRoutes,
    { 
      path: 'logout', 
      Component: () => (<></>), 
      loader: logoutLoader 
    },
  ]
}

export default app;