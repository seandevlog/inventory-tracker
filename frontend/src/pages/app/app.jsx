import { useEffect, useState } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import axios from 'axios';

import styles from './app.module.css';

import NavTop from '@components/navBars/navTop/navTop';

import AppContext from '@contexts/app.context';
import config from '@config';
const { server } = config;

const App = () => {
  const loaderData = useLoaderData();
  const { token: oldToken } = loaderData ?? {};

  const [token, setToken] = useState(oldToken);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    if (!token) (async () => {
      console.log('hello')
      const { data } = await axios.get(`${server}/auth/refresh`, {
        withCredentials: true 
      })

      const { accessToken } = data;
      setToken(accessToken);
    })()
  }, [token])

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