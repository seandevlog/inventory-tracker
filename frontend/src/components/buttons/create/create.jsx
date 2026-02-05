import styles from './create.module.css';

const Create = ({ children, onClick }) => (
  <div className={styles.create}>
    <button 
      className='btn' 
      onClick={onClick}
    >
      {children}
    </button>
  </div>
)

export default Create;