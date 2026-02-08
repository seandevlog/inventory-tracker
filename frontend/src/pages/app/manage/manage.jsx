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
  const [items, setItems] = useItem();
  const [locations, setLocations] = useLocation();
  const [transactions, setTransactions] = useTransaction();
  const [suppliers, setSuppliers] = useSupplier();
  const [orders, setOrders] = useOrder();
  const [users, setUsers] = useUser();

  return (
    <ManageContext.Provider value={{
      items, locations, transactions, suppliers, orders, users
    }}>
      <div className={style.manage}>
        <NavSub />
        <Outlet />
      </div>
    </ManageContext.Provider>
  )
}

export default Manage;