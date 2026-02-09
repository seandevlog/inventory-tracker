import Items from '@features/manage/items/items';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { itemSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const items = {
  path: path.items,
  id: path.items,
  Component: Items,
  loader: loaderWithPath(getAll, path.items),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Item'}),
      action: actionWithConfig({ 
        action: create,
        path: path.items,
        schema: itemSchema
      }),
    },
    {
      path: `:${removeLastS(path.items)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Item'}),
    },
    {
      path: `:${removeLastS(path.items)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Item'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.items,
        schema: itemSchema
      })
    }
  ]
}

export default items;