import { 
  useContext
} from 'react';
import { orderSchema, orderSelections as selections } from '@my-org/shared/validators'

import AppContext from '@contexts/app.context';
import ManageContext from '@contexts/manage.context';

import headers from './headers';
import inputs from './inputs';

import Order from '@assets/placeholders/order.svg';

import Main from '@layouts/main/main';

const Orders = () => {
  const { profile } = useContext(AppContext);
  const { orders, suppliers, items } = useContext(ManageContext);

  return (
    <Main
      id='order'
      data={orders}
      headers={headers}
      FeaturePlaceholder={Order}
      selections={selections}
      inputs={inputs({ suppliers, items, profile })}
      schema={orderSchema}
    />
  )
}

export default Orders