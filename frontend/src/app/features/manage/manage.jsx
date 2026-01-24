import style from './manage.module.css';
import { Outlet, useLoaderData } from "react-router-dom";
import NavTop from '@components/navBars/navTop/navTop';
import NavSub from '@components/navBars/navSub/navSub';

const Manage = () => {
  const loaderData = useLoaderData();
  const { user } = loaderData; 

  return (
    <div className={style.manage}>
      <NavTop 
        user={user || {}}
      />
      <NavSub />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Manage;