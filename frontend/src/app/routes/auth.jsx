import { Outlet } from "react-router-dom";
import styles from './auth.module.css';
import Logo from '@components/Logo/Logo';
import LogoImage from '@components/Logo/image/image';

const Auth = () => {
  return (
    <>
      <div className={styles.auth}>
        <Logo className="authLogo"/>
        <Outlet />
      </div>
      <LogoImage className="authBackgroundImage"/>
    </>
  )
}

export default Auth;