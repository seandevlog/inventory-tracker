import Items from '@features/manage/items/items';
import { 
  getAll as getAllItemsLoader
} from '@features/manage/items/items.loaders';
import {
  create as createItemAction,
  view as viewItemAction,
  edit as editItemAction
} from '@features/manage/items/items.actions';

import Modal from '@components/modal/modal';

const items = {
  id: 'items',
  path: 'items/',
  Component: Items,
  loader: getAllItemsLoader,
  children: [
    {
      path: 'create/',
      element: <Modal mode='create' title='Create Item'/>,
      action: createItemAction
    },
    {
      path: ':itemId/',
      element: <Modal mode='view' title='View Item'/>,
      action: viewItemAction
    },
    {
      path: ':itemId/edit/',
      element: <Modal mode='edit' title='Edit Item'/>,
      action: editItemAction
    }  
  ]
}

export default items;