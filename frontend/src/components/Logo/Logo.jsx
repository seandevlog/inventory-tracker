import LogoImage from "./image/image";
import styles from './logo.module.css';

const Logo = ({ className }) => {
  return (
    <span 
      id="logo" 
      className={styles[`${className}`]}
    >
      <LogoImage className="logoImage"></LogoImage>
      <span>Logo</span>
    </span>
  )
}

export { LogoImage };
export default Logo;