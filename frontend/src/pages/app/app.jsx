import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './app.module.css';

import NavTop from '@layouts/navBars/navTop/navTop';
import Loading from '@pages/loading/loading';

import useToken from '@hooks/useToken';
import useProfile from '@hooks/useProfile';
import useItem from '@hooks/useItem';
import useLocation from '@hooks/useLocation';
import useTransaction from '@hooks/useTransaction';
import useSupplier from '@hooks/useSupplier';
import useOrder from '@hooks/useOrder';
import useUser from '@hooks/useUser';

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const App = () => {
  const [tokenRefreshKey, setTokenRefreshKey] = useState(0);
  const bumpTokenRefresh = () => setTokenRefreshKey(key => key + 1); 
  const { token } = useToken({ refreshKey: tokenRefreshKey });

  const [profileRefreshKey, setProfileRefreshKey] = useState(0);
  const bumpProfileRefresh = () => setProfileRefreshKey(key => key + 1); 
  const { profile } = useProfile({ refreshKey: profileRefreshKey, token });

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

  return (
    <AppContext.Provider value={{
      token, tokenRefreshKey, bumpTokenRefresh, 
      profile, profileRefreshKey, bumpProfileRefresh,
      items, itemRefreshKey, bumpItemRefresh,
      locations, locationRefreshKey, bumpLocationRefresh,
      orders, orderRefreshKey, bumpOrderRefresh,
      suppliers, supplierRefreshKey, bumpSupplierRefresh,
      transactions, transactionRefreshKey, bumpTransactionRefresh,
      users, userRefreshKey, bumpUserRefresh,
    }}>
      <div className={styles.app}>
        <Loading/>
        <NavTop/>
        <Outlet />
      </div>
    </AppContext.Provider>
  )
}

export default App;