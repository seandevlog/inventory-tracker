import { useState, useContext } from 'react';

import styles from './navSub.module.css';
import AppContext from '@contexts/app.context';

import RedirectLink from '@components/redirect/redirect';
import StockSearch from '@components/stockSearch/stockSearch';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

import { ArrowDown } from '@assets/arrows';

import config from '@config';
import { useLocation } from 'react-router-dom';
const { path } = config;

const quickActions = [ 'viewStock' ];
const links = [ 'dashboard', 'users', 'items', 'locations', 'suppliers', 'orders', 'transactions' ];

const NavSub = () => {
  const [isDrop, setIsDrop] = useState(false);

  const handleDrop = () => {
    setIsDrop(!isDrop);
  }

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
          <RedirectList/>
        </ul>
      </nav>
      <div className={isDrop ? styles.showDrop : styles.hideDrop}>
        <StockSearch/>
      </div>
    </>
  )
}

const RedirectList = () => {
  const { profile } = useContext(AppContext);

  const { role } = profile ?? {};
  const renderLinks = role !== 'admin'
    ? links.filter(link => link !== 'users') 
    : links ?? [];

  const [selected, setSelected] = useState('');

  const handleSelect = (event) => {
    setSelected(event.target.id);
  };

  return (
    <>
      {renderLinks?.map(link => (
        <li key={link}>
          <NavLink
            url={path[link].absolute}
            id={link}
            onSelect={handleSelect}
            selected={selected}
          >
            {firstCharUppercase(link)}
          </NavLink>
        </li>
      ))}
    </>
  )
} 

const NavLink = ({ id, url, selected, onSelect, children }) => {
  const { pathname } = useLocation();

  const handleClick = (event) => {
    if (onSelect) onSelect(event);
  }

  return (
    <div 
      id={id}
      className={(selected === id) || (url === pathname) || !id
        ? styles.linkSelected
        : undefined
      }
      onClick={handleClick}
    >
      <RedirectLink
        url={url}
      >
        {children}  
      </RedirectLink>
    </div>
  )
}

export default NavSub;