import {
  profile as profileLoader
} from '@pages/profile/loader';
import Profile from '@pages/profile/profile'
import isAuthedMiddleware from '@middlewares/isAuthed';
import withMiddleware from '@middlewares/helpers/withMiddleware';

const profile = { 
  path: 'profile', 
  Component: Profile, 
  loader: withMiddleware(isAuthedMiddleware, profileLoader)
}

export default profile;