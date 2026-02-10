import Items from '@features/manage/items/items';
import {
  create,
  edit
} from '@features/manage/actions';
import { itemSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const items = {
  path: path.items.relative,
  id: path.items.relative,
  Component: Items,
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Item'}),
      action: actionWithConfig({ 
        action: create,
        path: path.items.relative,
        schema: itemSchema
      }),
    },
    {
      path: `:${removeLastS(path.items.relative)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Item'}),
    },
    {
      path: `:${removeLastS(path.items.relative)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Item'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.items.relative,
        schema: itemSchema
      })
    }
  ]
}

export default items;