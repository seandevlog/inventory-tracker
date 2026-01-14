import styles from './CreateButton.module.css';

const CreateButton = ({ children, onClick }) => (
  <button 
    className={`${styles.create} btn`} 
    onClick={onClick}
  >
    {children}
  </button>
)

export default CreateButton;