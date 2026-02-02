import { useNavigate, useLocation } from 'react-router-dom';
import styles from './redirect.module.css';

const RedirectLink = ({ id, url, children, selected, onSelect }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (event) => {
    if (url === pathname) return;
    navigate(url, { relative: 'path' });
    if (onSelect) onSelect(event);
  }

  return (
    <a 
      id={id}
      className={(id && selected && selected === id && url && url === pathname) 
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