import { useState } from 'react';
import styles from './create.module.css';
import Plus from '@assets/plus.svg';

const Create = ({ children, onClick }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      className={styles.create}
      onMouseOver={() => setShowDescription(true)}
      onMouseOut={() => setShowDescription(false)}
    >
      { showDescription &&
        <div className={styles.description}>
          {children}
        </div>
      }
      <button
        onClick={onClick}
      >
        <Plus/>
      </button>
    </div>
  )
}

export default Create;