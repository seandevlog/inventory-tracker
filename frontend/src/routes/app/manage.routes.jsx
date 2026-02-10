import usersRoutes from '@routes/app/manage/users.routes';
import itemsRoutes from '@routes/app/manage/items.routes';
import locationsRoutes from '@routes/app/manage/locations.routes';
import suppliersRoutes from '@routes/app/manage/suppliers.routes';
import ordersRoutes from '@routes/app/manage/orders.routes';
import transactionsRoutes from '@routes/app/manage/transactions.routes';

import dashboardRoutes from '@routes/app/manage/dashboard.routes';

import Manage from '@pages/app/manage/manage'
import Error from '@pages/error/error';

import config from '@config';
const { path } = config;

const manage = {
  id: path.manage.relative,
  path: path.manage.relative,
  Component: Manage,
  ErrorBoundary: Error,
  children: [
    dashboardRoutes,
    usersRoutes,
    itemsRoutes,
    locationsRoutes,
    suppliersRoutes,
    ordersRoutes,
    transactionsRoutes
  ]
}

export default manage;