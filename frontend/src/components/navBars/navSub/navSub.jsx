import * as React from 'react';
import styles from './navSub.module.css';
import RedirectLink from '@components/buttons/redirect/redirect';
import firstCharUppercase from '@utils/firstCharUppercase';

const links = [ 'users', 'items', 'locations', 'suppliers', 'orders', 'transactions' ];

const NavSub = () => {
  const [selected, setSelected] = React.useState('');
  
  const handleSelect = (event) => {
    setSelected(event.target.id);
  }

  return (
    <nav className={styles.navSub}>
      <ul className={styles.links}>
        {links.map(link => (
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