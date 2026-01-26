import usersRoutes from './users.routes';
import itemsRoutes from './items.routes';
import dashboardRoutes from './dashboard.routes';

import { 
  manage as manageLoader 
} from '@pages/manage/loader';
import Manage from '@pages/manage/manage'
import Error from '@pages/error/error';

import isAuthedMiddleware from '@middlewares/isAuthed';

const manage = {
  Component: Manage,
  middleware: [isAuthedMiddleware],
  loader: manageLoader,
  ErrorBoundary: Error,
  children: [
    dashboardRoutes,
    usersRoutes,
    itemsRoutes
  ]
}

export default manage;