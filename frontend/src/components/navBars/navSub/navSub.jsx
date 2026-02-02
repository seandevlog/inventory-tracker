import { useState, useContext } from 'react';

import styles from './navSub.module.css';
import AppContext from '@contexts/app.context';

import RedirectLink from '@components/buttons/redirect/redirect';
import firstCharUppercase from '@utils/firstCharUppercase';

const links = [ 'users', 'items', 'locations', 'suppliers', 'orders', 'transactions' ];

const NavSub = () => {
  const { profile } = useContext(AppContext);

  const [selected, setSelected] = useState('');
  
  const handleSelect = (event) => {
    setSelected(event.target.id);
  }

  const { role } = profile ?? {};
  const renderLinks = role !== 'admin'
    ? links.filter(link => link !== 'users') 
    : links ?? [];

  return (
    <nav className={styles.navSub}>
      <ul className={styles.links}>
        {renderLinks?.map(link => (
          <li key={link}>
            <RedirectLink
              url={`/${link}`}
              id={link}
              onSelect={handleSelect}
              selected={selected}
            >
              {firstCharUppercase(link)}
            </RedirectLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavSub;