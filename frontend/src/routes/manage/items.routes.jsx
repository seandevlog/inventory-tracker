import Items from '@features/manage/items/items';
import {
  create,
  edit
} from '@features/manage/actions';
import { itemSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const items = {
  path: path.items.relative,
  id: path.items.relative,
  Component: Items,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.items.relative, 
        schema: itemSchema 
      })
    },
    {
      path: `:${removeLastS(path.items.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.items.relative, 
        schema: itemSchema 
      })
    }
  ]
}

export default items;