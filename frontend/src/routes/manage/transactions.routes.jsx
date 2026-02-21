import Transactions from '@features/manage/transactions/transactions';
import {
  create,
  edit
} from '@features/manage/actions';
import { transactionSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const transactions = {
  path: path.transactions.relative,
  id: path.transactions.relative,
  Component: Transactions,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.transactions.relative, 
        schema: transactionSchema 
      })
    },
    {
      path: `:${removeLastS(path.transactions.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.transactions.relative, 
        schema: transactionSchema 
      })
    }
  ]
}

export default transactions;