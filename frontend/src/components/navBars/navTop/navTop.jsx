import styles from './navTop.module.css';
import Logo from '@components/logo/logo';
import RedirectLink from '@components/buttons/redirect/redirect';

const NavTop = () => (
  <nav className={styles.navTop}>
    <span>
        <Logo className="navLogo"/>
    </span>
    <form>
        <input type="search" placeholder="What are you looking for?"/>
    </form>
    <ul className={styles.links}>
        <li><RedirectLink url="#" className="navTopRedirect">FAQ</RedirectLink></li>
        <li><RedirectLink url="/logout" className="navTopRedirect">Logout</RedirectLink></li>
    </ul>
  </nav>
)

export default NavTop;