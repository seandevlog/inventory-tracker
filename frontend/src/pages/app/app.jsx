import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import styles from './app.module.css';

import NavTop from '@layouts/navBars/navTop/navTop';

import useToken from '@hooks/useToken';
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
  const [profile, setProfile] = useState(null);

  const { token } = useToken();

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

  const items = useItem({ refreshKey: itemRefreshKey, token });
  const locations = useLocation({ refreshKey: locationRefreshKey, token });
  const orders = useOrder({ refreshKey: orderRefreshKey, token });
  const suppliers = useSupplier({ refreshKey: supplierRefreshKey, token });
  const transactions = useTransaction({ refreshKey: transactionRefreshKey, token });
  const users = useUser({ refreshKey: userRefreshKey, profile, token });

  const style = (pathname) => (
    // pathname === path.app.absolute
    pathname === path.root
    ? { 
        color: 'black',
      }
    : undefined
  );

  return (
    <AppContext.Provider value={{
      token, profile, setProfile,
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