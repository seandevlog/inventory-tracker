import Suppliers from '@features/manage/suppliers/suppliers';
import { getAll as getAllSuppliersLoader } from '@features/manage/suppliers/loaders';
import {
  create as createSupplierAction,
  edit as editSupplierAction
} from '@features/manage/suppliers/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const suppliers = {
  path: 'suppliers',
  id: 'suppliers',
  Component: Suppliers,
  loader: withMiddleware(isAuthedMiddleware, getAllSuppliersLoader),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Supplier'}),
      action: withMiddleware(isAuthedMiddleware, createSupplierAction),
    },
    {
      path: ':supplierId',
      Component: () => Modal({ mode: 'view', title: 'View Supplier'}),
    },
    {
      path: ':supplierId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit Supplier'}),
      action: withMiddleware(isAuthedMiddleware, editSupplierAction)
    }
  ]
}

export default suppliers;