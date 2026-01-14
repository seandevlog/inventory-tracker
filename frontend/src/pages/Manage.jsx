import style from './Manage.module.css';
import { Outlet } from "react-router-dom";
import NavTop from '../components/NavTop/NavTop';
import NavSub from '../components/NavSub/NavSub';

const Manage = () => (
  <div className={style.manage}>
    <NavTop />
    <NavSub />
    <main>
      <Outlet />
    </main>
  </div>
)

export default Manage;