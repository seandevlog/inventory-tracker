import Profile from '@pages/app/profile/profile'

import config from '@config';
const { path } = config;

const profile = { 
  id: path.profile.relative,
  path: path.profile.relative, 
  Component: Profile,
  ErrorBoundary: Error
}

export default profile;