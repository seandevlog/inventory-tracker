import LogoImage from "./image/LogoImage";
import styles from './Logo.module.css';

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