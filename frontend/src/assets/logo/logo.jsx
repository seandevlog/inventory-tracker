import styles from './logo.module.css';

const Logo = () => {
  return (
    <span 
      id="logo" 
      className={styles.logo}
    >
      <p>Inventory Tracker</p>
    </span>
  )
}

export default Logo;