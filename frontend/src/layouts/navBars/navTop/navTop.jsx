import { useContext, useEffect, useMemo } from 'react';
import { useFetcher, useLocation, useNavigate } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/redirect/redirect';

import firstCharUppercase from '@utils/firstCharUppercase';
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
  
  const handleLogout = () => {
    fetcher.submit(null, { 
      method: 'DELETE',
      action: '/auth/logout' 
    });
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

  if (pathname === path.auth.absolute || pathname === path.register.absolute) return (
    <nav className={styles.authNav} style={
      pathname === path.root
      ? { background: 'transparent', zIndex: 1 }
      : undefined
    }>
      <RedirectLink url={path.root} classes={styles.redirect} >
        <Logo classes={styles.logo}/>
      </RedirectLink>
    </nav>
  )

  return (
    <nav className={styles.navTop} style={
      pathname === path.root
      ? { background: 'transparent', zIndex: 1 }
      : undefined
    }>
      <RedirectLink url={path.root} classes={styles.redirect}>
        <Logo classes={isManage? styles.manageLogo : styles.logo}/>
      </RedirectLink>
      <ul className={styles.links}>
          <li>
            {pathname.includes('profile')
              ? <RedirectLink url={path.manage.absolute}>Manage</RedirectLink>
              : <RedirectLink url={(givenName && firstCharUppercase(givenName)) ? path.profile.absolute : path.auth.absolute}>{(givenName && firstCharUppercase(givenName)) || 'Sign in'}</RedirectLink>
            }
          </li>
          <li>
            <RedirectLink url={path.faq.absolute}>
              FAQ
            </RedirectLink>
          </li>
          {typeof profile !== 'undefined' && profile !== null &&
            <li
              onClick={handleLogout}
            >
              <RedirectLink>
              Logout
              </RedirectLink>
            </li>
          }
      </ul>
    </nav>
  )
}

export default NavTop;