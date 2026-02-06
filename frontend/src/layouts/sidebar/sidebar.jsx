import styles from './sidebar.module.css';
import Filter from '@components/filter/filter';

const Sidebar = () => {

  return (
    <div className={styles.sidebar}>
      <Filter/>
    </div>
  )
}

export default Sidebar;