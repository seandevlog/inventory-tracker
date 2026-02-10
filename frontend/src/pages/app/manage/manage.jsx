import { useState } from 'react';
import style from './manage.module.css';
import { Outlet } from "react-router-dom";

import useItem from '@hooks/useItem';
import useLocation from '@hooks/useLocation';
import useTransaction from '@hooks/useTransaction';
import useSupplier from '@hooks/useSupplier';
import useOrder from '@hooks/useOrder';
import useUser from '@hooks/useUser';
import ManageContext from '@contexts/manage.context';

import NavSub from '@layouts/navBars/navSub/navSub';

const Manage = () => {
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

  const items = useItem({ refreshKey: itemRefreshKey });
  const locations = useLocation({ refreshKey: locationRefreshKey });
  const orders = useOrder({ refreshKey: orderRefreshKey });
  const suppliers = useSupplier({ refreshKey: supplierRefreshKey });
  const transactions = useTransaction({ refreshKey: transactionRefreshKey });
  const users = useUser({ refreshKey: userRefreshKey });

  return (
    <ManageContext.Provider value={{
      items, itemRefreshKey, bumpItemRefresh,
      locations, locationRefreshKey, bumpLocationRefresh,
      orders, orderRefreshKey, bumpOrderRefresh,
      suppliers, supplierRefreshKey, bumpSupplierRefresh,
      transactions, transactionRefreshKey, bumpTransactionRefresh,
      users, userRefreshKey, bumpUserRefresh,
    }}>
      <div className={style.manage}>
        <NavSub />
        <Outlet/>
      </div>
    </ManageContext.Provider>
  )
}

export default Manage;