import Users from '@features/manage/users/users';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { userSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const users = {
  path: path.users.relative,
  id: path.users.relative,
  Component: Users,
  loader: loaderWithPath(getAll, path.users.relative),
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create User'}),
      action: actionWithConfig({ 
        action: create, 
        path: path.users.absolute, 
        schema: userSchema 
      })
    },
    {
      path: `:${removeLastS(path.users.relative)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View User'}),
    },
    {
      path: `:${removeLastS(path.users.relative)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit User'}),
      action: actionWithConfig({ 
        action: edit, 
        path: path.users.absolute, 
        schema: userSchema 
      })
    }
  ]
}

export default users;