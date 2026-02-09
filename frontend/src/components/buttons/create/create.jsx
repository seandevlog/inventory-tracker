import styles from './create.module.css';
import Plus from '@assets/plus.svg';

const Create = ({ children, onClick }) => {

  return (
    <div 
      className={styles.create}
    >
      <button
        onClick={onClick}
      >
        <Plus/>
      </button>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Create;