import Users from '@features/manage/users/users';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { userSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const users = {
  path: path.users,
  id: path.users,
  Component: Users,
  loader: withMiddleware(isAuthedMiddleware, loaderWithPath(getAll, path.users)),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create User'}),
      action: withMiddleware(isAuthedMiddleware, actionWithConfig({ 
        action: create,
        path: path.users,
        schema: userSchema
      })),
    },
    {
      path: `:${removeLastS(path.users)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View User'}),
    },
    {
      path: `:${removeLastS(path.users)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit User'}),
      action: withMiddleware(isAuthedMiddleware, actionWithConfig({ 
        action: edit,
        path: path.users,
        schema: userSchema
      }))
    }
  ]
}

export default users;