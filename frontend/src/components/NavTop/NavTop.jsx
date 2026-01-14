import styles from './NavTop.module.css';
import Logo from '../Logo/Logo';
import RedirectLink from '../RedirectLink/RedirectLink';

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
        <li><RedirectLink url="/login" className="navTopRedirect">Login</RedirectLink></li>
        <li><RedirectLink url="/register" className="navTopRedirect">Register</RedirectLink></li>
    </ul>
  </nav>
)

export default NavTop;