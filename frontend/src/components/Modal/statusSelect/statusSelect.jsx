import * as React from 'react';
import styles from './statusSelect.module.css';

const ModalStatusSelect = ({ disabled, children }) => {
  const [select, setSelect] = React.useState(children);

  const handleSelect = (event) => {
    setSelect(event.target.value);
  }

  return (
    <div className={styles.isActive}>
      <label htmlFor='isActive'>Current Status</label>
      <select 
        id="isActive"
        name="isActive"
        required 
        disabled={disabled} 
        value={select}
        onChange={handleSelect}
      >
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
  )
}

export default ModalStatusSelect;