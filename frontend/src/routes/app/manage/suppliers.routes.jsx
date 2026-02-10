import Suppliers from '@features/manage/suppliers/suppliers';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { supplierSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const suppliers = {
  path: path.suppliers.relative,
  id: path.suppliers.relative,
  Component: Suppliers,
  loader: loaderWithPath(getAll, path.suppliers.relative),
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Supplier'}),
      action: actionWithConfig({ 
        action: create,
        path: path.suppliers.relative,
        schema: supplierSchema
      }),
    },
    {
      path: `:${removeLastS(path.suppliers.relative)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Supplier'}),
    },
    {
      path: `:${removeLastS(path.suppliers.relative)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Supplier'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.suppliers.relative,
        schema: supplierSchema
      })
    }
  ]
}

export default suppliers;