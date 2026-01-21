import styles from './navSub.module.css';
import RedirectLink from '@components/buttons/redirect/redirect';

const NavSub = () => (
  <nav className={styles.navSub}>
    <ul className={styles.links}>
      <li><RedirectLink url="./users" className="navSubRedirect">Users</RedirectLink></li>
      <li><RedirectLink url="#" className="navSubRedirect">Items</RedirectLink></li>
      <li><RedirectLink url="#" className="navSubRedirect">Locations</RedirectLink></li>   
      <li><RedirectLink url="#" className="navSubRedirect">Suppliers</RedirectLink></li>
      <li><RedirectLink url="#" className="navSubRedirect">Orders</RedirectLink></li>
      <li><RedirectLink url="#" className="navSubRedirect">Transactions</RedirectLink></li>
    </ul>
  </nav>
)

export default NavSub;