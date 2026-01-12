import { Outlet } from "react-router-dom";
import './auth.css';
import Logo, { LogoImage } from "../../logo";

const Auth = () => {
  return (
    <>
      <div className="auth-form">
        <Logo />
        <Outlet />
      </div>
      <LogoImage className="logo-background"/>
    </>
  )
}

export default Auth;