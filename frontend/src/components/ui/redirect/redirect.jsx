import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const RedirectLink = ({
  url,
  children,
  classes,
  onClick,
  Component,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = useCallback(
    (event) => {
      event?.preventDefault();

      onClick?.();

      if (!url || url === pathname) return;

      navigate(url);
    },
    [navigate, onClick, pathname, url]
  );

  return (
    <a
      href={url}
      className={classes}
      onClick={handleClick}
    >
      {Component && <Component />}

      {children && <span>{children}</span>}
    </a>
  );
};

export default RedirectLink;