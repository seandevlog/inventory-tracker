import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./searchBarInput.module.css";

import firstCharUppercase from "@utils/firstCharUppercase";
import SearchIcon from "@assets/searchIcon.svg";

const SearchBarInput = ({
  id,
  data = [],
  submitted = "",
  setSubmitted,
}) => {
  const inputRef = useRef(null);
  const buttonTimerRef = useRef(null);

  const [searchValue, setSearchValue] = useState(
    submitted ?? ""
  );
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isButtonSubmitted, setIsButtonSubmitted] =
    useState(false);

  const inputId = id
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const resultsId = `${inputId}-results`;

  const options = useMemo(() => {
    return [
      ...new Set(
        data
          .filter((value) => value !== null && value !== undefined)
          .map((value) => String(value))
      ),
    ];
  }, [data]);

  const filteredData = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    if (!query) return options;

    return options.filter((option) =>
      option.toLowerCase().includes(query)
    );
  }, [options, searchValue]);

  useEffect(() => {
    setSearchValue(submitted ?? "");
  }, [submitted]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchValue]);

  useEffect(() => {
    return () => {
      if (buttonTimerRef.current) {
        clearTimeout(buttonTimerRef.current);
      }
    };
  }, []);

  const animateButton = useCallback(() => {
    setIsButtonSubmitted(true);

    if (buttonTimerRef.current) {
      clearTimeout(buttonTimerRef.current);
    }

    buttonTimerRef.current = setTimeout(() => {
      setIsButtonSubmitted(false);
    }, 150);
  }, []);

  const selectValue = useCallback(
    (value) => {
      setSearchValue(value);
      setSubmitted?.(value);
      setActiveIndex(-1);
      setIsFocused(false);
    },
    [setSubmitted]
  );

  const submitValue = useCallback(() => {
    const selectedValue =
      activeIndex >= 0 &&
      activeIndex < filteredData.length
        ? filteredData[activeIndex]
        : searchValue.trim();

    setSearchValue(selectedValue);
    setSubmitted?.(selectedValue);
    setActiveIndex(-1);
    setIsFocused(false);

    animateButton();
    inputRef.current?.blur();
  }, [
    activeIndex,
    animateButton,
    filteredData,
    searchValue,
    setSubmitted,
  ]);

  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    setActiveIndex(-1);
    setIsFocused(true);

    if (!value.trim()) {
      setSubmitted?.("");
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();

        if (!filteredData.length) return;

        setIsFocused(true);

        setActiveIndex((currentIndex) =>
          currentIndex >= filteredData.length - 1
            ? 0
            : currentIndex + 1
        );

        break;
      }

      case "ArrowUp": {
        event.preventDefault();

        if (!filteredData.length) return;

        setIsFocused(true);

        setActiveIndex((currentIndex) =>
          currentIndex <= 0
            ? filteredData.length - 1
            : currentIndex - 1
        );

        break;
      }

      case "Enter": {
        event.preventDefault();
        submitValue();
        break;
      }

      case "Escape": {
        setIsFocused(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      }

      default:
        break;
    }
  };

  const handleWrapperBlur = (event) => {
    const nextElement = event.relatedTarget;

    if (
      nextElement &&
      event.currentTarget.contains(nextElement)
    ) {
      return;
    }

    setIsFocused(false);
    setActiveIndex(-1);
  };

  return (
    <div
      className={styles.searchBarWrapper}
      onBlur={handleWrapperBlur}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        value={searchValue}
        placeholder={`Enter ${firstCharUppercase(id)}`}
        autoComplete="off"
        role="combobox"
        aria-label={`Search by ${id}`}
        aria-expanded={isFocused}
        aria-controls={resultsId}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0
            ? `${inputId}-option-${activeIndex}`
            : undefined
        }
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
      />

      <button
        type="button"
        className={`${styles.icon} ${
          isButtonSubmitted ? styles.iconClicked : ""
        }`}
        aria-label={`Submit ${id}`}
        onClick={submitValue}
      >
        <SearchIcon aria-hidden="true" />
      </button>

      {isFocused && (
        <div
          id={resultsId}
          className={styles.searchResults}
          role="listbox"
        >
          {filteredData.length > 0 ? (
            filteredData.map((value, index) => (
              <button
                id={`${inputId}-option-${index}`}
                key={value}
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                className={`${styles.resultOption} ${
                  activeIndex === index
                    ? styles.resultOptionActive
                    : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                }}
                onClick={() => selectValue(value)}
              >
                {value}
              </button>
            ))
          ) : (
            <p className={styles.noResults}>
              No matching results
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarInput;