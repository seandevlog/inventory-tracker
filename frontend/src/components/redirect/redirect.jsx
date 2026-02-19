import { useNavigate, useLocation } from 'react-router-dom';

const RedirectLink = ({ url, children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (url === pathname) return;
    navigate(url);
  }

  return (
    <a
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default RedirectLink;