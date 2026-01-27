import Users from '@features/manage/users/users';
import { getAll as getAllUsersLoader } from '@features/manage/users/loaders';
import {
  create as createUserAction,
  edit as editUserAction
} from '@features/manage/users/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const users = {
  path: 'users',
  id: 'users',
  Component: Users,
  loader: withMiddleware(isAuthedMiddleware, getAllUsersLoader),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create User'}),
      action: withMiddleware(isAuthedMiddleware, createUserAction),
    },
    {
      path: ':userId',
      Component: () => Modal({ mode: 'view', title: 'View User'}),
    },
    {
      path: ':userId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit User'}),
      action: withMiddleware(isAuthedMiddleware, editUserAction)
    }
  ]
}

export default users;