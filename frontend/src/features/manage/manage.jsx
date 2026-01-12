import './manage.css';
import { Outlet } from "react-router-dom";
import { NavTop, NavSub } from './manage.components'

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