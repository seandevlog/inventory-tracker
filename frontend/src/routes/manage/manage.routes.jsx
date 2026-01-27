import usersRoutes from './users.routes';
import itemsRoutes from './items.routes';
import dashboardRoutes from './dashboard.routes';

import Manage from '@pages/manage/manage'
import Error from '@pages/error/error';

const manage = {
  Component: Manage,
  ErrorBoundary: Error,
  children: [
    dashboardRoutes,
    usersRoutes,
    itemsRoutes
  ]
}

export default manage;