import styles from './logo.module.css';

const Logo = ({ classes }) => {
  return (
    <span 
      id="logo" 
      className={`${classes} ${styles.logo}`}
    >
      <p>Inventory Tracker</p>
    </span>
  )
}

export default Logo;