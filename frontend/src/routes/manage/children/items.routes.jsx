import Items from '@features/manage/items/items';
import { getAll as getAllItemsLoader } from '@features/manage/items/loaders';
import {
  create as createItemAction,
  edit as editItemAction
} from '@features/manage/items/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const items = {
  path: 'items',
  id: 'items',
  Component: Items,
  loader: withMiddleware(isAuthedMiddleware, getAllItemsLoader),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Item'}),
      action: withMiddleware(isAuthedMiddleware, createItemAction),
    },
    {
      path: ':itemId',
      Component: () => Modal({ mode: 'view', title: 'View Item'}),
    },
    {
      path: ':itemId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit Item'}),
      action: withMiddleware(isAuthedMiddleware, editItemAction)
    }
  ]
}

export default items;