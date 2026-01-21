import styles from './create.module.css';

const Create = ({ children, onClick }) => (
  <button 
    className={`${styles.create} btn`} 
    onClick={onClick}
  >
    {children}
  </button>
)

export default Create;