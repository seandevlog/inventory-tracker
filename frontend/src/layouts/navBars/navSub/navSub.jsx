import { useState } from 'react';

import styles from './navSub.module.css';

import StockSearch from './stockSearch/stockSearch';
import { QuickActionList, RedirectList } from './navSub.helper';

import { 
  Dashboard,
  Users,
  Items,
  Suppliers,
  Locations,
  Orders,
  Transactions,
  Links as LinksSVG,
  QuickActions as QuickActionsSVG,
  ViewStock
} from '@assets/navBot/';

const quickActions = [
  { name: 'viewStock', Component: ViewStock, Action: StockSearch }
];
const links = [ 
  { name: 'dashboard', Component: Dashboard },
  { name: 'users', Component: Users },
  { name: 'items', Component: Items },
  { name: 'locations', Component: Locations },
  { name: 'suppliers', Component: Suppliers },
  { name: 'orders', Component: Orders },
  { name: 'transactions', Component: Transactions }
];

const NavSub = () => {
  const [isActionsShown, setIsActionsShown] = useState(false);

  const isMobile = window.innerWidth <= 570; 

  const [isNavStretched, setIsNavStretched] = useState(false);

  if (isMobile) return (
    isActionsShown ? (
      <>
        <nav className={isNavStretched? styles.navStretch : styles.navSub}>
          <ul className={styles.links}>
            <li>
              <div onClick={() => setIsActionsShown(false)}>
                <LinksSVG/>
                <a>Links</a>
              </div>
            </li>
            <QuickActionList 
              list={quickActions}
              classes={styles}
              setIsNavStretched={setIsNavStretched}
            />
          </ul>
        </nav>
      </>
    ) : (
      <nav className={styles.navSub}>
        <ul className={styles.links}>
          <li>
            <div onClick={() => setIsActionsShown(true)}>
              <QuickActionsSVG/>
              <a>Actions</a>
            </div>
          </li>
          <RedirectList 
            list={links}
            classes={styles}
          />  
        </ul>
      </nav>
    )
  )

  return (
    <>
      <nav className={styles.navSub}>
        <ul className={styles.quickActions}>
          <QuickActionList 
            list={quickActions}
            classes={styles}
          />
        </ul>
        <ul className={styles.links}>
          <RedirectList 
            list={links}
            classes={styles}
          />
        </ul>
      </nav>
    </>
  )
}

export default NavSub;