import styles from './filterSelect.module.css';

const FilterSelect = ({ onFilter }) => (
  <select 
    className={styles.filterSelect} 
    name="filter"
    onChange={onFilter}
  >
    <option value='true'>Filter by: Active</option>
    <option value='false'>Filter by: Inactive</option>
    <option value='' selected>No Filter</option>
  </select>
)

export default FilterSelect;