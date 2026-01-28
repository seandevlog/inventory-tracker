import { Outlet } from 'react-router-dom';
import NavTop from '@components/navBars/navTop/navTop';
import styles from './app.module.css';

const App = () => {return (
    <div className={styles.app}>
      <NavTop />
      <Outlet />
    </div>
  )
}

export default App;