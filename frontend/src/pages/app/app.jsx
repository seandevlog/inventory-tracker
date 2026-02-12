import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken, setToken } from '@stores/token';

import styles from './app.module.css';

import NavTop from '@layouts/navBars/navTop/navTop';

import useItem from '@hooks/useItem';
import useLocation from '@hooks/useLocation';
import useTransaction from '@hooks/useTransaction';
import useSupplier from '@hooks/useSupplier';
import useOrder from '@hooks/useOrder';
import useUser from '@hooks/useUser';

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

  const [itemRefreshKey, setItemRefreshKey] = useState(0);
  const [locationRefreshKey, setLocationRefreshKey] = useState(0);
  const [orderRefreshKey, setOrderRefreshKey] = useState(0);
  const [supplierRefreshKey, setSupplierRefreshKey] = useState(0);
  const [transactionRefreshKey, setTransactionRefreshKey] = useState(0);
  const [userRefreshKey, setUserRefreshKey] = useState(0);

  const bumpItemRefresh = () => setItemRefreshKey(key => key + 1);
  const bumpLocationRefresh = () => setLocationRefreshKey(key => key + 1);
  const bumpOrderRefresh = () => setOrderRefreshKey(key => key + 1);
  const bumpSupplierRefresh = () => setSupplierRefreshKey(key => key + 1);
  const bumpTransactionRefresh = () => setTransactionRefreshKey(key => key + 1);
  const bumpUserRefresh = () => setUserRefreshKey(key => key + 1);

  const items = useItem({ refreshKey: itemRefreshKey, token: tokenState });
  const locations = useLocation({ refreshKey: locationRefreshKey, token: tokenState });
  const orders = useOrder({ refreshKey: orderRefreshKey, token: tokenState });
  const suppliers = useSupplier({ refreshKey: supplierRefreshKey, token: tokenState });
  const transactions = useTransaction({ refreshKey: transactionRefreshKey, token: tokenState });
  const users = useUser({ refreshKey: userRefreshKey, profile, token: tokenState });

  const style = (pathname) => (
    pathname === path.app.absolute
    ? { 
        color: 'black',
      }
    : undefined
  );

  return (
    <AppContext.Provider value={{
      token: tokenState, profile,
      items, itemRefreshKey, bumpItemRefresh,
      locations, locationRefreshKey, bumpLocationRefresh,
      orders, orderRefreshKey, bumpOrderRefresh,
      suppliers, supplierRefreshKey, bumpSupplierRefresh,
      transactions, transactionRefreshKey, bumpTransactionRefresh,
      users, userRefreshKey, bumpUserRefresh,
    }}>
      <div className={styles.app}>
        <NavTop style={style}/>
        <Outlet />
      </div>
    </AppContext.Provider>
  )
}

export default App;