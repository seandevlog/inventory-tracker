import styles from './headerSort.module.css';
import sortOptions from './headerSort.config';
import { ArrowDownUp, ArrowDown, ArrowUp } from '@assets/arrows';

const HeaderSort = ({
  children,
  onSort,
  sortState,
}) => (
  <th className={styles.tableHeaderSort}>
    <button
      type="button"
      onClick={onSort}
      aria-label={`Sort by ${children}`}
    >
      <span>{children}</span>

      {sortState === sortOptions.ASCENDING ? (
        <ArrowUp />
      ) : sortState === sortOptions.DESCENDING ? (
        <ArrowDown />
      ) : (
        <ArrowDownUp />
      )}
    </button>
  </th>
);

export default HeaderSort;