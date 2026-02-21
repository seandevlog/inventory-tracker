import Suppliers from '@features/manage/suppliers/suppliers';
import {
  create,
  edit
} from '@features/manage/actions';
import { supplierSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const suppliers = {
  path: path.suppliers.relative,
  id: path.suppliers.relative,
  Component: Suppliers,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.suppliers.relative, 
        schema: supplierSchema 
      })
    },
    {
      path: `:${removeLastS(path.suppliers.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.suppliers.relative, 
        schema: supplierSchema 
      })
    }
  ]
}

export default suppliers;