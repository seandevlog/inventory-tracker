import { 
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

import Transaction from '@assets/placeholders/transaction.svg';

import Main from '@components/main/main';

const { server } = config;

const Transactions = () => {
  const transactions = useLoaderData();

  const [items, setItems] = useState(null);
  const [locations, setLocations] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const [{ data: locationData }, { data: itemData }, { data: profileData }] = await Promise.all([
        axios.get(`${server}/locations`, { withCredentials: true }),
        axios.get(`${server}/items`, { withCredentials: true }),
        axios.get(`${server}/profile`, { withCredentials: true })
      ])

      const { locations } = locationData;
      setLocations(locations);

      const { items } = itemData;
      setItems(items);

      const { profile } = profileData;
      setProfile(profile ? profile?.username: '');
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