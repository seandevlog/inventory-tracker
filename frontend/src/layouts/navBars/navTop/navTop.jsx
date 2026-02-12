import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

import firstCharUppercase from '@utils/firstCharUppercase';

import config from '@config';
const { path } = config;

const NavTop = ({style}) => {
  const { pathname } = useLocation();
  const { 
    profile
  } = useContext(AppContext);

  const { givenName } = profile ?? {}; 
  
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
              : <RedirectLink url={path.profile.absolute} style={
                  style(pathname)
                }>{(givenName && firstCharUppercase(givenName)) || 'Profile'}</RedirectLink>
            }
          </li>
          <li><RedirectLink url={path.faq.absolute} style={
                style(pathname)
              }>FAQ</RedirectLink></li>
          <li><RedirectLink url={path.logout.absolute} style={
                style(pathname)
              }>Logout</RedirectLink></li>
      </ul>
    </nav>
  )
}

export default NavTop;