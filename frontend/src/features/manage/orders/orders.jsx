import { 
  useContext,
  useEffect, 
  useState, 
} from 'react';
import { 
  useLoaderData,
} from 'react-router-dom';
import axios from 'axios';
import config from '@config';
import { orderSchema, orderSelections as selections } from '@my-org/shared/validators'

import AppContext from '@contexts/app.context';
import headers from './headers';
import inputs from './inputs';

import Order from '@assets/placeholders/order.svg';

import Main from '@layouts/main/main';

const { server } = config;

const Orders = () => {
  const orders = useLoaderData();
  const { token, profile } = useContext(AppContext);

  const [suppliers, setSuppliers] = useState(null);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const [{ data: supplierData }, { data: itemData }] = await Promise.all([
        axios.get(`${server}/suppliers`, { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        }),
        axios.get(`${server}/items`, { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        })
      ])

      const { suppliers } = supplierData;
      setSuppliers(suppliers);

      const { items } = itemData;
      setItems(items);
    })()
  }, [token]);

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