import * as React from 'react';
import styles from './status.module.css';

const Status = ({ data, disabled }) => {
  const [isActive, setIsActive] = React.useState(data?.isActive);
  
  const handleSelect = (event) => {
    setIsActive(event.target.value);
  }

  return (
    <fieldset className={styles.status}>
      <legend></legend>
      <div className={styles.isActive}>
        <label htmlFor='isActive'>Current Status</label>
        <select 
          id="isActive"
          name="isActive"
          required 
          disabled={disabled} 
          value={isActive}
          onChange={handleSelect}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    </fieldset>
  )
}

export default Status;