import * as React from 'react';

const ModalStatusSelect = ({ disabled, children }) => {
  const [select, setSelect] = React.useState(children);

  const handleSelect = (event) => {
    setSelect(event.target.value);
  }

  return (
    <select 
      name="status" 
      required 
      disabled={disabled} 
      value={select}
      onChange={handleSelect}
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  )
}

export default ModalStatusSelect;