import Transactions from '@features/manage/transactions/transactions';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { transactionSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const transactions = {
  path: path.transactions,
  id: path.transactions,
  Component: Transactions,
  loader: loaderWithPath(getAll, path.transactions),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Transaction'}),
      action: actionWithConfig({ 
        action: create,
        path: path.transactions,
        schema: transactionSchema
      }),
    },
    {
      path: `:${removeLastS(path.transactions)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Transaction'}),
    },
    {
      path: `:${removeLastS(path.transactions)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Transaction'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.transactions,
        schema: transactionSchema
      })
    }
  ]
}

export default transactions;