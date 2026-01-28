import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import config from '@config';
import styles from './navTop.module.css';
import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

const { server } = config;

const NavTop = () => {
  const { pathname } = useLocation();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${server}/profile`, {
        withCredentials: true
      })

      const { profile: _profile } = data;
      setProfile(_profile);
    })()
  }, []);

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
          <li><RedirectLink url="#">FAQ</RedirectLink></li>
          <li><RedirectLink url="/logout">Logout</RedirectLink></li>
      </ul>
    </nav>
  )
}

export default NavTop;