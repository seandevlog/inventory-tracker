import {
  profile as profileLoader
} from '@pages/app/profile/loader';
import Profile from '@pages/app/profile/profile'

const profile = { 
  id: 'profile',
  path: 'profile', 
  Component: Profile, 
  loader: profileLoader
}

export default profile;