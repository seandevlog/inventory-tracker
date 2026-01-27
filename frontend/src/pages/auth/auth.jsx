import { Outlet } from "react-router-dom";
import styles from './auth.module.css';
import Logo from '@assets/Logo/Logo';
import LogoImage from '@assets/Logo/image/image';

const Auth = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.auth}>
        <Logo className="authLogo"/>
        <Outlet />
      </div>
      <div className={styles.backgroundImage}>
        <LogoImage/>
      </div>
    </div>
  )
}

export default Auth;