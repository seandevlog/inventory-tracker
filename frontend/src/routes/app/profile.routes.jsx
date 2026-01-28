import {
  profile as profileLoader
} from '@pages/app/profile/loader';
import Profile from '@pages/app/profile/profile'
import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware';

const profile = { 
  id: 'profile',
  path: 'profile', 
  Component: Profile, 
  loader: withMiddleware(isAuthedMiddleware, profileLoader)
}

export default profile;