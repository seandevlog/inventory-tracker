import { useState, useMemo } from 'react';
import styles from './searchBarInput.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';

const SearchBarInput = ({ id, data, select, setSelect }) => {
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(false);

  const filteredData = useMemo(() => 
    data.filter(key => key.includes(value.trim().toUpperCase()))
  , [data, value])

  const handleValue = (event) => {
    setValue(event.target.value);
    setSelected(false);
  }
  
  const handleSelect = (selected) => {
    setSelect(selected);
    setValue(selected);
    setSelected(true);
  }

  return (
    <div className={styles.searchBarWrapper}>
      <input 
        id={id} 
        name={id}
        type='text' 
        value={value}
        onChange={handleValue}
        placeholder={`Enter ${firstCharUppercase(id)}`}
      />
      {value && !selected &&
        <div
          className={styles.searchResults}
        >
          {filteredData.map(key => (
            <span 
              key={key}
              onClick={() => handleSelect(key)}
            >
              {key}
            </span>
          ))}
        </div>      
      }
    </div>
  )
}

export default SearchBarInput