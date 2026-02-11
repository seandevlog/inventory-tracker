import style from './manage.module.css';
import { Outlet } from "react-router-dom";

import NavSub from '@layouts/navBars/navSub/navSub';

const Manage = () => {
  return (
    <div className={style.manage}>
      <NavSub />
      <Outlet/>
    </div>
  )
}

export default Manage;