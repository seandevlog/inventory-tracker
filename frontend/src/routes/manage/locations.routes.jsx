import Locations from '@features/manage/locations/locations';
import {
  create,
  edit
} from '@features/manage/actions';
import { locationSchema } from "@my-org/shared/validators";

import { actionWithConfig } from '@utils/router/actionWithConfig';
import removeLastS from '@utils/removeLastS';

import config from '@config';
const { path } = config;

const locations = {
  path: path.locations.relative,
  id: path.locations.relative,
  Component: Locations,
  children: [
    {
      path: 'create',
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: create, 
        path: path.locations.relative, 
        schema: locationSchema 
      })
    },
    {
      path: `:${removeLastS(path.locations.relative)}Id/edit`,
      Component: () => (<></>),
      action: actionWithConfig({ 
        action: edit, 
        path: path.locations.relative, 
        schema: locationSchema 
      })
    }
  ]
}

export default locations;