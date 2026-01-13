import { Outlet } from "react-router-dom";
import styles from './Auth.module.css';
import Logo from '../components/Logo/Logo';
import LogoImage from '../components/Logo/image/LogoImage';

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