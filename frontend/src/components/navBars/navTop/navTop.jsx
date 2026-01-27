import styles from './navTop.module.css';
import Logo from '@assets/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

const NavTop = () => (
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
        <li><RedirectLink url='/profile'>Profile</RedirectLink></li>
        <li><RedirectLink url="#">FAQ</RedirectLink></li>
        <li><RedirectLink url="/logout">Logout</RedirectLink></li>
    </ul>
  </nav>
)

export default NavTop;