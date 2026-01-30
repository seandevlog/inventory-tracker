import Transactions from '@features/manage/transactions/transactions';
import { getAll as getAllTransactionsLoader } from '@features/manage/transactions/loaders';
import {
  create as createTransactionAction,
  edit as editTransactionAction
} from '@features/manage/transactions/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const transactions = {
  path: 'transactions',
  id: 'transactions',
  Component: Transactions,
  loader: withMiddleware(isAuthedMiddleware, getAllTransactionsLoader),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Transaction'}),
      action: withMiddleware(isAuthedMiddleware, createTransactionAction),
    },
    {
      path: ':transactionId',
      Component: () => Modal({ mode: 'view', title: 'View Transaction'}),
    },
    {
      path: ':transactionId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit Transaction'}),
      action: withMiddleware(isAuthedMiddleware, editTransactionAction)
    }
  ]
}

export default transactions;