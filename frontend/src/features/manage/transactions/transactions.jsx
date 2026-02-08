import { 
  useContext,
} from 'react';

import { transactionSchema, transactionSelections as selections } from '@my-org/shared/validators'
import headers from './headers';
import inputs from './inputs';

import AppContext from '@contexts/app.context';
import ManageContext from '@contexts/manage.context';

import Transaction from '@assets/placeholders/transaction.svg';

import Main from '@layouts/main/main';

const Transactions = () => {
  const { transactions, items, locations } = useContext(ManageContext);
  const { profile } = useContext(AppContext);

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