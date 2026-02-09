import { Outlet } from "react-router-dom";
import styles from './auth.module.css';
import Logo from '@assets/logo/logo';

const Auth = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <Logo className="authLogo"/>
        <Outlet />
      </div>
      <div className={styles.backgroundImage}>
        <img src='/storage.jpg'/>
      </div>
    </div>
  )
}

export default Auth;