import { useContext, useEffect, useMemo, useState } from 'react';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import Hamburger from '@assets/hamburger.svg';
import CloseButton from '@assets/closeButton.svg';

import RedirectLink from '@components/redirect/redirect';
import NavContext from './navTop.helper';

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

  const isMobile = window.innerWidth <= 570;

  if (isAuth) return (
    <nav className={styles.authNav}>
      <RedirectLink url={path.root}>
        <Logo classes={styles.authLogo}/>
      </RedirectLink>
    </nav>
  )

  if (isMobile) return (
    <>
      <nav 
        className={isMobileNavExpand ? styles.mobileNavShow : styles.mobileNavHide}
      >
        {isMobileNavExpand ?
          <CloseButton
            classes={`${styles.navTopIcon} ${styles.closeButton}`}
            onClick={() => setIsMobileNavExpand(false)}
          /> :
          <Hamburger 
            classes={styles.navTopIcon}
            onClick={() => setIsMobileNavExpand(true)}
          />          
        }

        <NavContext
          id='mobile'
          pathname={pathname}
          givenName={givenName}
          profile={profile}
          handleLogout={handleLogout}
          styles={styles}
          onLinkClick={() => setIsMobileNavExpand(false)}
        />
      </nav>
      {isMobileNavExpand && <div className={styles.mobileNavBackground}/>}
    </>
  )

  return (
    <nav className={isManage ? styles.manageNav : styles.homeNav}>
      <NavContext
        id={isManage ? 'manage' : 'home'}
        isManage={isManage}
        pathname={pathname}
        givenName={givenName}
        profile={profile}
        handleLogout={handleLogout}
        styles={styles}
      /> 
    </nav>
  )
}



export default NavTop;