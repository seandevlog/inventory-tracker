import styles from './back.module.css'
import Svg from '@assets/backButton.svg'

const BackButton = ({ onClick }) => (
  <button 
    className={styles.modalClose}
    onClick={onClick}  
  >
    <Svg/>
  </button>
)

export default BackButton;