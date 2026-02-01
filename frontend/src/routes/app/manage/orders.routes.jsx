import Orders from '@features/manage/orders/orders';
import { getAll } from '@features/manage/loaders';
import {
  create as createOrderAction,
  edit as editOrderAction
} from '@features/manage/orders/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 
import { loaderWithPath } from '@utils/loaderWithPath';

const orders = {
  path: 'orders',
  id: 'orders',
  Component: Orders,
  loader: withMiddleware(isAuthedMiddleware, loaderWithPath(getAll, 'orders')),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Order'}),
      action: withMiddleware(isAuthedMiddleware, createOrderAction),
    },
    {
      path: ':orderId',
      Component: () => Modal({ mode: 'view', title: 'View Order'}),
    },
    {
      path: ':orderId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit Order'}),
      action: withMiddleware(isAuthedMiddleware, editOrderAction)
    }
  ]
}

export default orders;