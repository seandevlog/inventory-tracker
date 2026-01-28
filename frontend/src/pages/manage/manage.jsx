import style from './manage.module.css';
import { Outlet } from "react-router-dom";
import NavTop from '@components/navBars/navTop/navTop';
import NavSub from '@components/navBars/navSub/navSub';

const Manage = () => {

  return (
    <div className={style.manage}>
      <div>
        <NavTop />
        <NavSub />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Manage;