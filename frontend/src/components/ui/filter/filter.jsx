import { 
  useState,
  useContext
} from 'react';
import styles from './filter.module.css';
import DataTableContext from '@contexts/dataTable.context';

const Filter = () => {
  const { 
    setFilterOptions,
    filterOptions,
    selections
  } = useContext(DataTableContext);

  return (selections && Object.values(selections)?.length > 0) && (
    <div className={styles.filter}>
      <fieldset>
        <legend></legend>
        {selections && Object.keys(selections).map(key => (
          <Input 
            key={key}
            objKey={key}
            selections={selections}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        ))}
      </fieldset>
    </div>
  )
}

const Input = ({ objKey, selections, filterOptions, setFilterOptions }) => {
  const [selected, setSelected] = useState('');

  const handleSelect = (event) => {
    const group = event.target.closest('[data-group]')?.dataset.group;
    const value = event.target.value;

    const temp = {...filterOptions};
    if (temp[group] === value) {
      delete temp[group];
    } else {
      temp[group] = value;
    }
    setFilterOptions(temp);

    if (event.target.value === selected) {
      setSelected('')
    } else {
      setSelected(event.target.value)
    }
  }

  return (
    <fieldset 
      data-group={objKey}
      value
    >
      <legend>{`${objKey.charAt(0).toUpperCase()}${objKey.slice(1).replace(/([A-Z])/g, ' $1')}`}</legend>
      {selections[objKey].map(attr => (
        <div key={attr}>
          <input 
            type='checkbox' 
            id={attr} 
            name={objKey}
            value={attr}
            checked={selected === attr}
            onChange={handleSelect}
          />
          <label htmlFor={attr}>{`${attr.charAt(0).toUpperCase()}${attr.slice(1).replace(/([A-Z])/g, ' $1')}`}</label>
        </div>
      ))}
    </fieldset>
  )
}
  

export default Filter;