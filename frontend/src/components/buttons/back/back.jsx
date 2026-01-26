import styles from './back.module.css'
import Svg from '@assets/backButton.svg'

const BackButton = ({ onClose }) => (
  <button 
    className={styles.modalClose}
    onClick={onClose}  
  >
    <Svg/>
  </button>
)

export default BackButton;