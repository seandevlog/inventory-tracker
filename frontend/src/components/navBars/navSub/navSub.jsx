import * as React from 'react';
import styles from './navSub.module.css';
import RedirectLink from '@components/buttons/redirect/redirect';

const NavSub = () => {
  const [selected, setSelected] = React.useState('');
  
  const handleSelect = (event) => {
    setSelected(event.target.id);
  }

  return (
    <nav className={styles.navSub}>
      <ul className={styles.links}>
        <li>
          <RedirectLink 
            url='/users'
            id='users'
            onSelect={handleSelect}
            selected={selected}
          >
            Users
          </RedirectLink>
        </li>
        <li>
          <RedirectLink 
            url="/items"
            id='items'
            onSelect={handleSelect}
            selected={selected}
          >
            Items
          </RedirectLink>
        </li>
        <li>
          <RedirectLink 
            url="#"
            id='locations'
            onSelect={handleSelect}
            selected={selected}
          >
            Locations
          </RedirectLink>
        </li>   
        <li>
          <RedirectLink 
            url="#"
            id='suppliers'
            onSelect={handleSelect}
            selected={selected}
          >
            Suppliers
          </RedirectLink>
        </li>
        <li>
          <RedirectLink 
            url="#"
            id='orders'
            onSelect={handleSelect}
            selected={selected}
          >
            Orders
          </RedirectLink>
        </li>
        <li>
          <RedirectLink 
            url="#"
            id='transactions'
            onSelect={handleSelect}
            selected={selected}
          >
            Transactions
          </RedirectLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavSub;