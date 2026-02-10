import Orders from '@features/manage/orders/orders';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { orderSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const orders = {
  path: path.orders.relative,
  id: path.orders.relative,
  Component: Orders,
  loader: loaderWithPath(getAll, path.orders.relative), 
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Order'}),
      action: actionWithConfig({ 
        action: create,
        path: path.orders.absolute,
        schema: orderSchema
      }),
    },
    {
      path: `:${removeLastS(path.orders.relative)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Order'}),
    },
    {
      path: `:${removeLastS(path.orders.relative)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Order'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.orders.absolute,
        schema: orderSchema
      })
    }
  ]
}

export default orders;