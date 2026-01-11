import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <div id="auth">
        <span 
          id="logo" 
          className="logo"
        >
          <img src="../assets/image-solid-full.svg" alt="logo"/>
          Logo
        </span>
        <Outlet />
      </div>
      <img src='../../assets/image-solid-full.svg'/>
    </>
  )
}

export default Auth;