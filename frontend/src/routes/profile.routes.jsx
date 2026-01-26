import {
  profile as profileLoader
} from '@pages/profile/loader';
import Profile from '@pages/profile/profile'
import isAuthedMiddleware from '@middlewares/isAuthed';

const profile = { 
  path: 'profile', 
  Component: Profile, 
  middleware: [isAuthedMiddleware], 
  loader: profileLoader
}

export default profile;