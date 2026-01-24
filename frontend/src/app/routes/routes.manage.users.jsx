import Users from '@features/manage/users/users';
import { 
  getAll as getAllUsersLoader
} from '@features/manage/users/users.loaders';
import {
  create as createUserAction,
  view as viewUserAction,
  edit as editUserAction
} from '@features/manage/users/users.actions';

import Modal from '@components/modal/modal';

const users = {
  id: 'users',
  path: 'users/',
  Component: Users,
  loader: getAllUsersLoader,
  children: [
    {
      path: 'create/',
      element: <Modal mode='create' title='Create User'/>,
      action: createUserAction
    },
    {
      path: ':userId/',
      element: <Modal mode='view' title='View User'/>,
      action: viewUserAction
    },
    {
      path: ':userId/edit/',
      element: <Modal mode='edit' title='Edit User'/>,
      action: editUserAction
    }  
  ]
}

export default users;