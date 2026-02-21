import Orders from '@features/manage/orders/orders';
import {
  create,
  edit
} from '@features/manage/actions';
import { orderSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const orders = {
  path: path.orders.relative,
  id: path.orders.relative,
  Component: Orders,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.orders.relative, 
        schema: orderSchema 
      })
    },
    {
      path: `:${removeLastS(path.orders.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.orders.relative, 
        schema: orderSchema 
      })
    }
  ]
}

export default orders;