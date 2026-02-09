import { 
  useContext
} from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { orderSchema, orderSelections as selections } from '@my-org/shared/validators'

import ManageContext from '@contexts/manage.context';

import headers from './headers';
import inputs from './inputs';

import Order from '@assets/placeholders/order.svg';

import Main from '@layouts/main/main';

import config from '@config';

const { path } = config;

const Orders = () => {
  const items = useRouteLoaderData(path.items) 
  const suppliers =  useRouteLoaderData(path.suppliers);
  const { items: contextItems, suppliers: contextSuppliers } = useContext(ManageContext);
  const orders = useLoaderData();

  return (
    <Main
      id='order'
      data={orders}
      headers={headers}
      FeaturePlaceholder={Order}
      selections={selections}
      inputs={inputs({ suppliers: suppliers || contextSuppliers, items: items || contextItems })}
      schema={orderSchema}
    />
  )
}

export default Orders