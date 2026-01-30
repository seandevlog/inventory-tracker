import usersRoutes from '@routes/app/manage/users.routes';
import itemsRoutes from '@routes/app/manage/items.routes';
import locationsRoutes from '@routes/app/manage/locations.routes';
import suppliersRoutes from '@routes/app/manage/suppliers.routes';
import ordersRoutes from '@routes/app/manage/orders.routes';

import dashboardRoutes from '@routes/app/manage/dashboard.routes';

import Manage from '@pages/app/manage/manage'
import Error from '@pages/error/error';

const manage = {
  Component: Manage,
  ErrorBoundary: Error,
  children: [
    dashboardRoutes,
    usersRoutes,
    itemsRoutes,
    locationsRoutes,
    suppliersRoutes,
    ordersRoutes
  ]
}

export default manage;