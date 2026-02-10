import { useLoaderData } from 'react-router-dom';

import { transactionSchema, transactionSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import Transaction from '@assets/placeholders/transaction.svg';

import useItem from '@hooks/useItem';
import useLocation from '@hooks/useLocation';

import Main from '@layouts/main/main';

const Transactions = () => {
  const items = useItem();
  const locations = useLocation();
  const transactions = useLoaderData();

  return (
    <Main
      id='transaction'
      data={transactions}
      headers={headers}
      FeaturePlaceholder={Transaction}
      selections={selections}
      inputs={inputs({ items, locations })}
      schema={transactionSchema}
      disabled={{
        current: 
          (typeof locations?.length === 'undefined' || locations?.length <= 0) || (typeof items?.length === 'undefined' || items?.length <= 0),
        message: 
          (typeof locations?.length !== 'undefined' && locations?.length > 0)
          ? "We have locations now, next up, create items so there's something to transaction from them."
          : (typeof items?.length !== 'undefined' && items?.length > 0)
          ? "Nice, items are ready, now create locations so those items can actually come from somewhere." 
          : (typeof locations?.length === 'undefined' || locations?.length <= 0) || (typeof items?.length === 'undefined' || items?.length <= 0)
          ? "Transactions need items and locations to happen. Create items and assign locations first."
          : "",
      }}
    />
  )
}

export default Transactions