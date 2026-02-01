import Suppliers from '@features/manage/suppliers/suppliers';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { supplierSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const suppliers = {
  path: path.suppliers,
  id: path.suppliers,
  Component: Suppliers,
  loader: withMiddleware(isAuthedMiddleware, loaderWithPath(getAll, path.suppliers)),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Supplier'}),
      action: withMiddleware(isAuthedMiddleware, actionWithConfig({ 
        action: create,
        path: path.suppliers,
        schema: supplierSchema
      })),
    },
    {
      path: `:${removeLastS(path.suppliers)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Supplier'}),
    },
    {
      path: `:${removeLastS(path.suppliers)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Supplier'}),
      action: withMiddleware(isAuthedMiddleware, actionWithConfig({ 
        action: edit,
        path: path.suppliers,
        schema: supplierSchema
      }))
    }
  ]
}

export default suppliers;