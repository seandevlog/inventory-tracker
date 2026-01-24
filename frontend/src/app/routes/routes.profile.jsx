import {
  profile as profileLoader
} from '@features/profile/profile.loader';
import Profile from '@features/profile/profile'
import isAuthedMiddleware from '@middlewares/isAuthed';

const profile = { 
  path: 'profile', 
  Component: Profile, 
  middleware: [isAuthedMiddleware], 
  loader: profileLoader
}

export default profile;