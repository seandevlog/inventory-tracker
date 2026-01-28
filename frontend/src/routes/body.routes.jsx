
import itemsRoutes from './children/items.routes';
import locationsRoutes from './children/locations.routes';
import dashboardRoutes from './children/dashboard.routes';

import Manage from '@pages/manage/manage'
import Error from '@pages/error/error';const manage = {
  Component: Body,
  ErrorBoundary: Error,
  children: [
    dashboardRoutes,
    usersRoutes,
    itemsRoutes,
    locationsRoutes
  ]
}

export default manage;