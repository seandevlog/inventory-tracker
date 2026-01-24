import { useNavigate } from 'react-router-dom';
import styles from './redirect.module.css';

const RedirectLink = ({ id, url, children, className, selected, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(url);
    if (onSelect) onSelect(event);
  }

  return (
    <a 
      id={id}
      className={className
        ? styles[className]
        : id && selected && selected === id 
        ? styles.selected 
        : ''
      }
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default RedirectLink;