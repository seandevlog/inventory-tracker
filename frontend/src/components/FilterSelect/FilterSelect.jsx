import * as React from 'react';
import styles from './filterSelect.module.css';

const FilterSelect = ({ onFilter }) => {
  const [value, setValue] = React.useState('');
  const [isFiltered, setIsFiltered] = React.useState(false);

  const handleChange = (event) => {
    onFilter(event);
    setValue(event.target.value);
    if (event.target.value) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }

  return (
    <select 
      className={styles.filterSelect} 
      name="filter"
      onChange={handleChange}
      value={value}
    >
      <option value='true'>{`${isFiltered ? `` : `Filter by:`} Active`}</option>
      <option value='false'>{`${isFiltered ? `` : `Filter by:`} Inactive`}</option>
      <option value=''>No Filter</option>
    </select>
  )
}
  

export default FilterSelect;