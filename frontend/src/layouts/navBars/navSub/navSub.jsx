import { useState, useContext } from 'react';

import styles from './navSub.module.css';
import AppContext from '@contexts/app.context';

import RedirectLink from '@components/buttons/redirect/redirect';
import StockSearch from '@components/stockSearch/stockSearch';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

import { ArrowDown } from '@assets/arrows';

const quickActions = [ 'viewStock' ];
const links = [ 'users', 'items', 'locations', 'suppliers', 'orders', 'transactions' ];

const NavSub = () => {
  const { profile } = useContext(AppContext);

  const [selected, setSelected] = useState('');
  const [isDrop, setIsDrop] = useState(false);
  
  const handleSelect = (event) => {
    setSelected(event.target.id);
  }

  const handleDrop = () => {
    setIsDrop(!isDrop);
  }

  const { role } = profile ?? {};
  const renderLinks = role !== 'admin'
    ? links.filter(link => link !== 'users') 
    : links ?? [];

  return (
    <nav className={styles.navSub}>
      <ul className={styles.quickActions}>
        {quickActions?.map(action => (
          <li 
            key={action}
          >
            <div
              onClick={handleDrop}  
            >
              <p>{splitUppercase(firstCharUppercase(action))}</p>
              <span className={isDrop ? '' : styles.idle}><ArrowDown/></span>
            </div>
            {isDrop && <StockSearch/>}
          </li>
        ))}
      </ul>
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