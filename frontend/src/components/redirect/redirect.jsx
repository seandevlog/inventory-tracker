import { useNavigate, useLocation } from 'react-router-dom';

const RedirectLink = ({ url, children, classes, onClick }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (typeof onClick !== 'undefined') onClick();
    if (url === pathname) return;
    navigate(url);
  }

  return (
    <a
      onClick={handleClick}
      className={classes ?? undefined}
    >
      {children}
    </a>
  )
}

export default RedirectLink;