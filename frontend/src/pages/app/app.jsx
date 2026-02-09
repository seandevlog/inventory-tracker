import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import styles from './app.module.css';

import NavTop from '@layouts/navBars/navTop/navTop';

import AppContext from '@contexts/app.context';
import config from '@config';
const { server } = config;

const App = () => {
  const loaderData = useLoaderData();
  const { token } = loaderData ?? {};

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (token) (async () => {
      const { data } = await axios.get(`${server}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      
      const { profile: _profile } = data;
      setProfile(_profile);
    })()
  }, [token]);

  useEffect(() => {
    document.title = 'Inventory Tracker'
  }, []);

  return (
    <AppContext.Provider value={{ token, profile }}>
      <div className={styles.app}>
        <NavTop />
        <Outlet />
      </div>
    </AppContext.Provider>
  )
}

export default App;