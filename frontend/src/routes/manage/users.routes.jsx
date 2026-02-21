import Users from '@features/manage/users/users';
import {
  create,
  edit
} from '@features/manage/actions';
import { userSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const users = {
  path: path.users.relative,
  id: path.users.relative,
  Component: Users,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.users.relative, 
        schema: userSchema 
      })
    },
    {
      path: `:${removeLastS(path.users.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.users.relative, 
        schema: userSchema 
      })
    }
  ]
}

export default users;