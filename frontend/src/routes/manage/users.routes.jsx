import Users from '@features/manage/users/users';
import { 
  getAll as getAllUsersLoader
} from '@features/manage/users/loaders';
import {
  create as createUserAction,
  update as updateUserAction,
  destroy as deleteUserAction
} from '@features/manage/users/actions';

import Modal from '@components/modal/modal';

const users = {
  path: 'users/',
  id: 'users',
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
      element: <Modal mode='view' title='View User'/>
    },
    {
      path: ':userId/edit/',
      element: <Modal mode='edit' title='Edit User'/>,
      action: updateUserAction
    },
    {
      path: ':userId/delete/',
      element: <></>,
      action: deleteUserAction
    }
  ]
}

export default users;