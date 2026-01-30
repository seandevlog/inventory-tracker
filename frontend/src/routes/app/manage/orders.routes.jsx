import Orders from '@features/manage/orders/orders';
import { getAll as getAllOrdersLoader } from '@features/manage/orders/loaders';
import {
  create as createOrderAction,
  edit as editOrderAction
} from '@features/manage/orders/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const orders = {
  path: 'orders',
  id: 'orders',
  Component: Orders,
  loader: withMiddleware(isAuthedMiddleware, getAllOrdersLoader),  
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