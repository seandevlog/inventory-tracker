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
  path: path.transactions.relative,
  id: path.transactions.relative,
  Component: Transactions,
  loader: loaderWithPath(getAll, path.transactions.relative),
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Transaction'}),
      action: actionWithConfig({ 
        action: create,
        path: path.transactions.relative,
        schema: transactionSchema
      }),
    },
    {
      path: `:${removeLastS(path.transactions.relative)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Transaction'}),
    },
    {
      path: `:${removeLastS(path.transactions.relative)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Transaction'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.transactions.relative,
        schema: transactionSchema
      })
    }
  ]
}

export default transactions;