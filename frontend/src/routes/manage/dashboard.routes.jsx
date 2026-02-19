import Dashboard from '@features/manage/dashboard/dashboard';

import config from '@config';
const { path } = config;

const dashboard = {
  path: path.dashboard.relative,
  id: path.dashboard.relative,
  index: true,
  Component: Dashboard,
}

export default dashboard;