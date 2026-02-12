import { useNavigate, useLocation } from 'react-router-dom';

const RedirectLink = ({ id, url, children, selected, onSelect, style }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (event) => {
    if (url === pathname) return;
    navigate(url);
    if (onSelect) onSelect(event);
  }

  return (
    <a 
      id={id}
      style={((id && selected && selected === id) || (url && url === pathname) || !id) 
        ? style
        : undefined
      }
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default RedirectLink;