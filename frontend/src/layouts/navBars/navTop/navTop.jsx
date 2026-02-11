import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './navTop.module.css';
import AppContext from '@contexts/app.context';

import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

import firstCharUppercase from '@utils/firstCharUppercase';

import SearchBarInput from '@components/searchBarInput/searchBarInput';

import config from '@config';
const { path } = config;

const NavTop = () => {
  const { pathname } = useLocation();
  const { 
    profile,
    transactions,
    items,
    locations,
    orders,
    suppliers
  } = useContext(AppContext);

  const { givenName } = profile ?? {}; 
  
  return (
    <nav className={styles.navTop}>
      <span className={styles.logo}>
        <RedirectLink url={path.manage.absolute}>
          <Logo/>
        </RedirectLink>
      </span>
      <form>
        {/* <SearchBarInput id='search' data={[
          ...transactions.map(t => t._id), 
          ...items.map(i => i.sku), 
          ...locations.map(l => l.code), 
          ...orders.map(o => o._id), 
          ...suppliers.map(s => s.email)
        ]}/> */}
      </form>
      <ul className={styles.links}>
          <li>
            {pathname.includes('profile')
              ? <RedirectLink url={path.manage.absolute}>Manage</RedirectLink>
              : <RedirectLink url={path.profile.absolute}>{(givenName && firstCharUppercase(givenName)) || 'Profile'}</RedirectLink>
            }
          </li>
          <li><RedirectLink url={path.faq.absolute}>FAQ</RedirectLink></li>
          <li><RedirectLink url={path.logout.absolute}>Logout</RedirectLink></li>
      </ul>
    </nav>
  )
}

export default NavTop;