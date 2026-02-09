import Locations from '@features/manage/locations/locations';
import { getAll } from '@features/manage/loaders';
import {
  create,
  edit
} from '@features/manage/actions';
import { locationSchema } from "@my-org/shared/validators";

import Modal from '@components/modal/modal';

import { loaderWithPath } from '@utils/router/loaderWithPath';
import { actionWithConfig } from '@utils/router/actionWithConfig';
import { removeLastS } from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const locations = {
  path: path.locations,
  id: path.locations,
  Component: Locations,
  loader: loaderWithPath(getAll, path.locations), 
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Location'}),
      action: actionWithConfig({ 
        action: create,
        path: path.locations,
        schema: locationSchema
      }),
    },
    {
      path: `:${removeLastS(path.locations)}Id`,
      Component: () => Modal({ mode: 'view', title: 'View Location'}),
    },
    {
      path: `:${removeLastS(path.locations)}Id/edit`,
      Component: () => Modal({ mode: 'edit', title: 'Edit Location'}),
      action: actionWithConfig({ 
        action: edit,
        path: path.locations,
        schema: locationSchema
      })
    }
  ]
}

export default locations;