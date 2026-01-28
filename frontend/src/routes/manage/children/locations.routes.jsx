import Locations from '@features/manage/locations/locations';
import { getAll as getAllLocationsLoader } from '@features/manage/locations/loaders';
import {
  create as createLocationAction,
  edit as editLocationAction
} from '@features/manage/locations/actions';

import Modal from '@components/modal/modal';

import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware'; 

const locations = {
  path: 'locations',
  id: 'locations',
  Component: Locations,
  loader: withMiddleware(isAuthedMiddleware, getAllLocationsLoader),  
  children: [
    {
      path: 'create',
      Component: () => Modal({ mode: 'create', title: 'Create Location'}),
      action: withMiddleware(isAuthedMiddleware, createLocationAction),
    },
    {
      path: ':locationId',
      Component: () => Modal({ mode: 'view', title: 'View Location'}),
    },
    {
      path: ':locationId/edit',
      Component: () => Modal({ mode: 'edit', title: 'Edit Location'}),
      action: withMiddleware(isAuthedMiddleware, editLocationAction)
    }
  ]
}

export default locations;