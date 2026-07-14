import styles from './headerSort.module.css';
import sortOptions from './headerSort.config';
import { ArrowDownUp, ArrowDown, ArrowUp } from '@assets/arrows';

const HeaderSort = ({ children, onSort, sortState}) => (
  <th className={styles.tableHeaderSort}>
    <div onClick={onSort}>
      {children}
      {sortState === sortOptions.ASCENDING
      ? <ArrowUp/>
      : sortState === sortOptions.DESCENDING
      ? <ArrowDown/>
      : <ArrowDownUp/>
      }
    </div>
  </th>
)

export default HeaderSort;