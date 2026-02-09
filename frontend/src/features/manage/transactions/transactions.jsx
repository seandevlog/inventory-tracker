import { 
  useContext,
} from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

import { transactionSchema, transactionSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import ManageContext from '@contexts/manage.context';

import Transaction from '@assets/placeholders/transaction.svg';

import Main from '@layouts/main/main';

import config from '@config'

const { path } = config;

const Transactions = () => {
  const items = useRouteLoaderData(path.items) 
  const locations =  useRouteLoaderData(path.items);
  const { items: contextItems, locations: contextLocations } = useContext(ManageContext);
  const transactions = useLoaderData();

  return (
    <Main
      id='transaction'
      data={transactions}
      headers={headers}
      FeaturePlaceholder={Transaction}
      selections={selections}
      inputs={inputs({ items: items || contextItems, locations: locations || contextLocations })}
      schema={transactionSchema}
    />
  )
}

export default Transactions