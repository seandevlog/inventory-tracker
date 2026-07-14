import Profile from '@components/pages/profile/profile'

import config from '@config';
const { path } = config;

const profile = { 
  id: path.profile.relative,
  path: path.profile.relative, 
  Component: Profile,
  ErrorBoundary: Error
}

export default profile;