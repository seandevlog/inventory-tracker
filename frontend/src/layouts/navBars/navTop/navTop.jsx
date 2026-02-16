import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

import firstCharUppercase from '@utils/firstCharUppercase';

import config from '@config';
import { Profiler } from 'react';
const { path } = config;

const NavTop = ({style}) => {
  const { pathname } = useLocation();
  const { 
    profile,
    setProfile
  } = useContext(AppContext);

  const { givenName } = profile ?? {}; 
  
  const handleLogout = () => {
    setProfile(null);
  }

  return (
    <nav className={styles.navTop} style={
      pathname === path.app.absolute
      ? { background: 'transparent', zIndex: 1 }
      : undefined
    }>
      <span className={styles.logo}>
        <RedirectLink url={path.app.absolute} >
          <Logo style={
            style(pathname)
          }/>
        </RedirectLink>
      </span>
      <ul className={styles.links}>
          <li>
            {pathname.includes('profile')
              ? <RedirectLink url={path.manage.absolute}>Manage</RedirectLink>
              : <RedirectLink url={(givenName && firstCharUppercase(givenName)) ? path.profile.absolute : path.auth.absolute} style={
                  style(pathname)
                }>{(givenName && firstCharUppercase(givenName)) || 'Sign in'}</RedirectLink>
            }
          </li>
          <li><RedirectLink url={path.faq.absolute} style={
            style(pathname)
          }>FAQ</RedirectLink></li>
          {typeof profile !== 'undefined' && profile !== null &&
            <li
              onClick={handleLogout}
            ><RedirectLink url={path.logout.absolute} style={
              style(pathname)
            }>
              Logout
            </RedirectLink></li>
          }
      </ul>
    </nav>
  )
}

export default NavTop;