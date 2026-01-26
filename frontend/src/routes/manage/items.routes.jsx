import Items from '@features/manage/items/items';
import { 
  getAll as getAllItemsLoader
} from '@features/manage/items/loaders';
import {
  create as createItemAction,
  edit as editItemAction
} from '@features/manage/items/actions';

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
      element: <Modal mode='view' title='View Item'/>
    },
    {
      path: ':itemId/edit/',
      element: <Modal mode='edit' title='Edit Item'/>,
      action: editItemAction
    }  
  ]
}

export default items;