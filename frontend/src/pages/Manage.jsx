import './Manage.module.css';
import { Outlet } from "react-router-dom";
import NavTop from '../components/navTop';
import NavSub from '../components/navSub';

const Manage = () => (
  <div id="users" className="crud">
    <NavTop />
    <NavSub />
    <main>
      <Outlet />
    </main>
  </div>
)

export default Manage;