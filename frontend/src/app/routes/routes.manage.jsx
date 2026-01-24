import usersRoutes from './routes.manage.users';
import itemsRoutes from './routes.manage.items';
import dashboardRoutes from './routes.manage.dashboard';

import { 
  manage as manageLoader 
} from '@features/manage/manage.loader';
import Manage from '@features/manage/manage'
import Error from '@features/error/error';

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