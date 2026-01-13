import Logo from '../components/Logo/Logo';

const NavTop = () => (
  <nav className="top">
    <span className="logo">
        <Logo />
    </span>
    <form>
        <input type="search" placeholder="What are you looking for?"/>
    </form>
    <ul className="links">
        <li><a href="#">FAQ</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Sign Up</a></li>
    </ul>
  </nav>
)

export default NavTop;