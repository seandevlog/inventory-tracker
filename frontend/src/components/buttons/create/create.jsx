import styles from './create.module.css';
import Plus from '@assets/plus.svg';

const Create = ({ children, onClick }) => {

  return (
    <div 
      className={styles.create}
    >
      <div>
        <div className={styles.description}>
          {children}
        </div>
        <button
          onClick={onClick}
        >
          <Plus/>
        </button>
      </div>
    </div>
  )
}

export default Create;