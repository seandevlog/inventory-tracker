import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

const NavTop = () => {
  const { pathname } = useLocation();
  const { profile } = useContext(AppContext);

  const { givenName } = profile ?? {}; 
  
  return (
    <nav className={styles.navTop}>
      <span className={styles.logo}>
        <RedirectLink url='/dashboard'>
          <Logo/>
        </RedirectLink>
      </span>
      <form>
          <input type="search" placeholder="What are you looking for?"/>
      </form>
      <ul className={styles.links}>
          <li>
            {pathname.includes('profile')
              ? <RedirectLink url='/dashboard'>Manage</RedirectLink>
              : <RedirectLink url='/profile'>{givenName || 'Profile'}</RedirectLink>
            }
          </li>
          <li><RedirectLink url="/faq">FAQ</RedirectLink></li>
          <li><RedirectLink url="/logout">Logout</RedirectLink></li>
      </ul>
    </nav>
  )
}

export default NavTop;