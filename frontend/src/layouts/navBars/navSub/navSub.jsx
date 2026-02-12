import { useState, useContext } from 'react';

import styles from './navSub.module.css';
import AppContext from '@contexts/app.context';

import RedirectLink from '@components/buttons/redirect/redirect';
import StockSearch from '@components/stockSearch/stockSearch';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

import { ArrowDown } from '@assets/arrows';

import config from '@config';
const { path } = config;

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
    <>
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
                <span><ArrowDown/></span>
              </div>
            </li>
          ))}
        </ul>
        <ul className={styles.links}>
          <li>
            <RedirectLink
              url={path.manage.absolute}
              id='dashboard'
              onSelect={handleSelect}
              selected={selected}
              style={{
                width: '100%',
                height: '100%',
                boxShadow: 
                  `0 2px 0 var(--color-1),
                  0 5px 0 var(--color-2)`,
                color: 'black'
              }}
             >
              Dashboard
             </RedirectLink>
          </li>
          {renderLinks?.map(link => (
            <li key={link}>
              <RedirectLink
                url={path[link].absolute}
                id={link}
                onSelect={handleSelect}
                selected={selected}
                style={{
                  width: '100%',
                  height: '100%',
                  boxShadow: 
                    `0 2px 0 var(--color-1),
                    0 5px 0 var(--color-2)`,
                  color: 'black'
                }}
              >
                {firstCharUppercase(link)}
              </RedirectLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={isDrop ? styles.showDrop : styles.hideDrop}>
        <StockSearch/>
      </div>
    </>
  )
}

export default NavSub;