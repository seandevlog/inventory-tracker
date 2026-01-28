import style from './manage.module.css';
import { Outlet } from "react-router-dom";
import NavSub from '@components/navBars/navSub/navSub';

const Manage = () => {

  return (
    <div className={style.manage}>
      <NavSub />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Manage;