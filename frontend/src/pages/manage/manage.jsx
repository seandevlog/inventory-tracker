import { Outlet } from "react-router-dom";
import style from './manage.module.css';

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