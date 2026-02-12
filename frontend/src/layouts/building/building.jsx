import styles from './building.module.css';

import Gear from '@assets/gear.svg';

const Building = () => {
  return (
    <main className={styles.building}>
      <Gear/>
      <p>Content coming soon</p>
      <p>In the meantime, please feel free to explore other sections..</p>
    </main>
  )
}

export default Building;