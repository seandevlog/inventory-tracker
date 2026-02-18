import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import style from './manage.module.css';

import NavSub from '@layouts/navBars/navSub/navSub';

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const Manage = () => {
  const { token } = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate(path.root);
  }, [token, navigate])

  return (
    <div className={style.manage}>
      <NavSub />
      <Outlet/>
    </div>
  )
}

export default Manage;