import styles from './logo.module.css';

const Logo = ({ style }) => {
  return (
    <span 
      id="logo" 
      className={styles.logo}
    >
      <p style={style}>Inventory Tracker</p>
    </span>
  )
}

export default Logo;