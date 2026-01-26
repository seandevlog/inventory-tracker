import * as React from 'react';
import styles from './status.module.css';

const Status = ({ data, disabled }) => {
  const [isActive, setIsActive] = React.useState(data?.isActive || 'inactive');
  
  const handleIsActive = (event) => {
    setIsActive(event.target.value);
  }

  const [role, setRole] = React.useState(data?.role || 'staff');

  const handleRole = (event) => {
    setRole(event.target.value);
  }

  return (
    <fieldset className={styles.status}>
      <legend></legend>
      <div className={styles.role}>
        <label htmlFor='role'>Role</label>
        <select 
          id="role"
          name="role"
          required 
          disabled={disabled} 
          value={role}
          onChange={handleRole}
        >
          <option value='admin'>Admin</option>
          <option value='staff'>Staff</option>
        </select>
      </div>
      <div className={styles.isActive}>
        <label htmlFor='isActive'>Current Status</label>
        <select 
          id="isActive"
          name="isActive"
          required 
          disabled={disabled} 
          value={isActive}
          onChange={handleIsActive}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>
    </fieldset>
  )
}

export default Status;