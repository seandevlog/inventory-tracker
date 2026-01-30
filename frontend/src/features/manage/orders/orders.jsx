import { 
  useEffect, 
  useState, 
} from 'react';
import { 
  useLoaderData,
} from 'react-router-dom';
import axios from 'axios';
import config from '@config';

import { orderSchema, orderSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Order from '@assets/placeholders/order.svg';

import Main from '@components/main/main';

const { server } = config;

const Orders = () => {
  const orders = useLoaderData();

  const [suppliers, setSuppliers] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const [{ data: supplierData }, { data: itemData }] = await Promise.all([
        axios.get(`${server}/suppliers`, { withCredentials: true }),
        axios.get(`${server}/items`, { withCredentials: true })
      ])

      const { suppliers } = supplierData;
      setSuppliers(suppliers);

      const { items } = itemData;
      setItems(items);
    })()
  }, []);

  return (
    <Main
      id='order'
      data={orders}
      headers={headers}
      FeaturePlaceholder={Order}
      selections={selections}
      inputs={inputs({ suppliers, items })}
      schema={orderSchema}
    />
  )
}

export default Orders