import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, setToken } from '@stores/token';

import styles from './app.module.css';

import NavTop from '@layouts/navBars/navTop/navTop';

import AppContext from '@contexts/app.context';
import config from '@config';
const { server, path } = config;

const App = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [tokenState, setTokenState] = useState(getToken());

  useEffect(() => {
    if (typeof getToken() !== 'undefined' || getToken() !== null || getToken() !== '') (async() => {
      try {
        const { data } = await axios.get(`${server}/auth/refresh`, {
          withCredentials: true
        })

        setTokenState(data.accessToken);
        return setToken(data.accessToken);
      } catch (err) {
        console.log(err);
        return navigate(path.root);
      }
    })()
  }, [navigate])

  useEffect(() => {
    if (tokenState) (async () => {
      const { data } = await axios.get(`${server}/profile`, {
        headers: { Authorization: `Bearer ${tokenState}` },
        withCredentials: true,
      })
      
      const { profile: _profile } = data;
      setProfile(_profile);
    })()
  }, [tokenState]);

  useEffect(() => {
    document.title = 'Inventory Tracker'
  }, []);

  return (
    <AppContext.Provider value={{ token: tokenState, profile }}>
      <div className={styles.app}>
        <NavTop />
        <Outlet />
      </div>
    </AppContext.Provider>
  )
}

export default App;