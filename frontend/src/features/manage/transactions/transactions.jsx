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

import { transactionSchema, transactionSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import AppContext from '@contexts/app.context';

import Transaction from '@assets/placeholders/transaction.svg';

import Main from '@layouts/main/main';

const { server } = config;

const Transactions = () => {
  const transactions = useLoaderData();

  const { token, profile } = useContext(AppContext);

  const [items, setItems] = useState(null);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    (async () => {
      const [{ data: locationData }, { data: itemData }] = await Promise.all([
        axios.get(`${server}/locations`, { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        }),
        axios.get(`${server}/items`, { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true 
        })
      ])

      const { locations } = locationData;
      setLocations(locations);

      const { items } = itemData;
      setItems(items);
    })()
  }, []);

  return (
    <Main
      id='transaction'
      data={transactions}
      headers={headers}
      FeaturePlaceholder={Transaction}
      selections={selections}
      inputs={inputs({ items, locations, profile })}
      schema={transactionSchema}
    />
  )
}

export default Transactions