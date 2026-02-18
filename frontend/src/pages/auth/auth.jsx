import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from './auth.module.css';

import AppContext from '@contexts/app.context';

import config from '@config';
const { path } = config;

const Auth = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate(path.root);
  }, [token, navigate]);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <Outlet />
      </div>
      <div className={styles.backgroundImage}>
        <img src='/storage.jpg'/>
      </div>
    </div>
  )
}

export default Auth;