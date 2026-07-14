import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import styles from './searchBarInput.module.css';

import firstCharUppercase from '@utils/firstCharUppercase';

import SearchIcon from '@assets/searchIcon.svg';

const SearchBarInput = ({ id, data, setSubmitted }) => {
  const [searchValue, setSearchValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [tempSearchValue, setTempSearchValue] = useState('');
  const [queriedIndex, setQueriedIndex] = useState(-1);
  const [mouseHover, setMouseHover] = useState(false);
  const [buttonSubmit, setButtonSubmit] = useState(false);

  const filteredData = useMemo(() => 
    searchValue ? data?.filter(key => key?.includes(searchValue?.trim()?.toUpperCase())) : data
  , [data, searchValue])

  useEffect(() => {
    setQueriedIndex(-1);
  }, [filteredData, focused])

  useEffect(() => { 
    if (mouseHover) {
      setQueriedIndex(filteredData.findIndex(data => mouseHover === data));
    }
  }, [filteredData, mouseHover])
  
  const inputRef = useRef(null);

  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowDown':
        setQueriedIndex(prev => {
          const next = 
            prev >= filteredData.length - 1
              ? 0
              : prev + 1;
          setTempSearchValue(filteredData?.[next])
          return next;
        });
        return;
      case 'ArrowUp':
        setQueriedIndex(prev => {
          const next = 
            prev <= 0
            ? filteredData?.length - 1
            : prev - 1
          setTempSearchValue(filteredData?.[next]);
          return next;
        });
        return;
      case 'Escape':
        setFocused(false);
        return;
      case 'Backspace':
        if (!tempSearchValue && !searchValue) return setSubmitted('');
        if (!tempSearchValue) return;
        setTempSearchValue(
          tempSearchValue?.length > 0 && tempSearchValue?.slice(0, tempSearchValue?.length - 1)
        );
        setSearchValue(tempSearchValue);
        return;
      case 'Enter':
        setSubmitted(
          filteredData
          ? queriedIndex >= 0 && queriedIndex < filteredData?.length
            ? filteredData[queriedIndex]
            : searchValue
          : searchValue 
        )
        setFocused(false);
        inputRef.current.blur();
        setButtonSubmit(true);
        setTimeout(() => setButtonSubmit(false), 200);
        return;
      default:
        break;
    }
  }, [filteredData, queriedIndex, searchValue, tempSearchValue, setSubmitted])


  const handleInput = (event) => {
    setSearchValue(event.target.value);
  }
  
  const handleResults = useCallback((selected) => {
    setSearchValue(selected);
    setSubmitted(selected);
    setFocused(false);
  }, [setSubmitted])

  const handleButton = useCallback(() => {
    setSubmitted(searchValue);
    setButtonSubmit(true);
    setTimeout(() => setButtonSubmit(false), 150);
  }, [searchValue, setSubmitted]); 

  return (
    <div className={styles.searchBarWrapper}>
      <input 
        id={id}
        type='text' 
        value={tempSearchValue || searchValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
        placeholder={`Enter ${firstCharUppercase(id)}`}
      />
      {focused &&
        <div
          className={styles.searchResults}
        >
          {filteredData.map((key, index) => (
            <span 
              id={key}
              key={key}
              onMouseDown={() => handleResults(key)}
              onMouseEnter={(e) => setMouseHover(e.target.id)}
              onMouseLeave={() => setMouseHover(null)}
              style={(!mouseHover && index === queriedIndex) || mouseHover === key
                ? { background: 'var(--color-dark-2)' } 
                : undefined}
            >
              {key}
            </span>
          ))}
        </div>      
      }
      <div
        onClick={handleButton} 
        className={styles.icon}
        style={buttonSubmit
          ? { background: 'var(--color-2)'}
          : undefined
        }
      >
        <SearchIcon style={buttonSubmit
          ? { transform: 'scale(0.8)'}
          : undefined}/>
      </div>
    </div>
  )
}

export default SearchBarInput