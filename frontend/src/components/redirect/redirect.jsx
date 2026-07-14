import { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RedirectLink = ({ url, children, classes, onClick, isParentClicked, setIsParentClicked, Component }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = useCallback(() => {
    if (typeof onClick !== 'undefined') onClick();
    if (url === pathname) return;
    navigate(url);
  }, [navigate, onClick, pathname, url])

  useEffect(() => {
    if (isParentClicked) handleClick();
    if (setIsParentClicked) setIsParentClicked(false);
  }, [handleClick, isParentClicked, setIsParentClicked])

  return (
    <>
      {Component && <Component onClick={handleClick}/>}
      <a
        onClick={handleClick}
        className={classes ?? undefined}
      >
        {children}
      </a>
    </>
  )
}

export default RedirectLink;