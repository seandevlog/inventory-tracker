import { useContext, useEffect, useMemo, useState } from 'react';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import Hamburger from '@assets/hamburger.svg';
import CloseButton from '@assets/closeButton.svg';

import RedirectLink from '@components/redirect/redirect';
import NavContent from './navTop.helper';

import getTopLevelRoute from '@utils/getTopLevelRoute';

import config from '@config';

const { path } = config;

const NavTop = () => {
  const { pathname } = useLocation();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const {
    profile,
    bumpProfileRefresh,
    bumpTokenRefresh
  } = useContext(AppContext); 

  const { givenName } = profile ?? {};

  const [isMobileNavExpand, setIsMobileNavExpand] = useState(false);
  
  const handleLogout = () => {
    fetcher.submit(null, { 
      method: 'DELETE',
      action: '/auth/logout' 
    });
    setIsMobileNavExpand(false);
  }

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success ) {
      bumpTokenRefresh();
      bumpProfileRefresh();
      navigate(0, { replace : true })
    }
  }, [fetcher, navigate])

  const isManage = useMemo(() =>
    getTopLevelRoute(pathname) === path.manage.relative
  , [pathname])

  const isAuth = useMemo(() =>
    pathname === path.auth.absolute || pathname === path.register.absolute
  , [pathname])

  useEffect(() => {
    setIsMobileNavExpand(false);
  }, [pathname]);

  if (isAuth) return (
    <nav className={styles.authNav}>
      <RedirectLink url={path.root}>
        <Logo classes={styles.authLogo}/>
      </RedirectLink>
    </nav>
  )

  return (
    <>
      <nav 
        className={`${isManage ? styles.manageNav : styles.homeNav} ${isMobileNavExpand ? styles.mobileNavShow : styles.mobileNavHide}`}>
        
        {isMobileNavExpand ?
          <CloseButton
            classes={`${styles.navTopIcon} ${styles.closeButton} ${isManage ? styles.manageIcon : ""}`}
            onClick={() => setIsMobileNavExpand(false)}
          /> :
          <Hamburger 
            classes={`${styles.navTopIcon} ${isManage ? styles.manageIcon : ""}`}
            onClick={() => setIsMobileNavExpand(true)}
          />          
        }

        <NavContent
          id={isManage ? "manage" : "home"}
          pathname={pathname}
          profile={profile}
          handleLogout={handleLogout}
          styles={styles}
          onLinkClick={() => setIsMobileNavExpand(false)}
        />
      </nav>
      {isMobileNavExpand && 
        <div 
          className={styles.mobileNavBackground}
          onClick={() => setIsMobileNavExpand(false)}
        />
      }
    </>
  )
}



export default NavTop;