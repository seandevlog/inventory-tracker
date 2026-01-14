import styles from './FilterSelect.module.css';

const FilterSelect = () => (
  <select className={styles.filterSelect} name="filter">
    <option value="active">Filter by: Active</option>
    <option value="inactive">Filter by: Inactive</option>
    <option value="no-filter" selected>No Filter</option>
  </select>
)

export default FilterSelect;