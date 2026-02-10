import { useLoaderData } from 'react-router-dom';
import { orderSchema, orderSelections as selections } from '@my-org/shared/validators'

import headers from './headers';
import inputs from './inputs';

import useItem from '@hooks/useItem';
import useSupplier from '@hooks/useSupplier';

import Order from '@assets/placeholders/order.svg';

import Main from '@layouts/main/main';

const Orders = () => {
  const items = useItem();
  const suppliers = useSupplier();
  const orders = useLoaderData();
  
  return (
    <Main
      id='order'
      data={orders}
      headers={headers}
      FeaturePlaceholder={Order}
      selections={selections}
      inputs={inputs({ suppliers, items })}
      schema={orderSchema}
      disabled={{
        current: 
          (typeof suppliers?.length === 'undefined' || suppliers?.length <= 0) || (typeof items?.length === 'undefined' || items?.length <= 0),
        message: 
          (typeof suppliers?.length !== 'undefined' && suppliers?.length > 0)
          ? "We have suppliers now, next up, create items so there's something to order from them."
          : (typeof items?.length !== 'undefined' && items?.length > 0)
          ? "Nice, items are ready, now create suppliers so those items can actually come from somewhere." 
          : (typeof suppliers?.length === 'undefined' || suppliers?.length <= 0) || (typeof items?.length === 'undefined' || items?.length <= 0)
          ? "You've opened Orders, but there's nothing to order yet. Try creating items and suppliers first."
          : "",
      }}
    />
  )
}

export default Orders