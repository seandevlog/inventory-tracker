import styles from './filterSelect.module.css';

const FilterSelect = ({ onFilter }) => (
  <select 
    className={styles.filterSelect} 
    name="filter"
    onChange={onFilter}
  >
    <option value="active">Filter by: Active</option>
    <option value="inactive">Filter by: Inactive</option>
    <option value="noFilter" selected>No Filter</option>
  </select>
)

export default FilterSelect;