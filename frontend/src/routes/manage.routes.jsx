import { redirect } from 'react-router-dom';

import usersRoutes from '@routes/manage/users.routes';
import itemsRoutes from '@routes/manage/items.routes';
import locationsRoutes from '@routes/manage/locations.routes';
import suppliersRoutes from '@routes/manage/suppliers.routes';
import ordersRoutes from '@routes/manage/orders.routes';
import transactionsRoutes from '@routes/manage/transactions.routes';

import dashboardRoutes from '@routes/manage/dashboard.routes';

import Manage from '@pages/manage/manage'
import Error from '@pages/error/error';

import config from '@config';
const { path } = config;

const manage = {
  id: path.manage.relative,
  path: path.manage.relative,
  Component: Manage,
  ErrorBoundary: Error,
  children: [
    { index: true, loader: () => redirect('dashboard') },
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