import { useContext } from "react";

import styles from "./filter.module.css";

import DataTableContext from "@contexts/dataTable.context";

const formatLabel = (value) =>
  `${value.charAt(0).toUpperCase()}${value
    .slice(1)
    .replace(/([A-Z])/g, " $1")}`;

const createInputId = (group, value) =>
  `${group}-${value}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");

const Filter = () => {
  const {
    setFilterOptions,
    filterOptions,
    selections,
  } = useContext(DataTableContext);

  const selectionEntries = Object.entries(
    selections ?? {}
  ).filter(
    ([, values]) =>
      Array.isArray(values) && values.length > 0
  );

  if (selectionEntries.length === 0) {
    return null;
  }

  return (
    <div className={styles.filter}>
      <fieldset className={styles.filterGroups}>
        <legend className={styles.srOnly}>
          Filter table data
        </legend>

        {selectionEntries.map(([key, values]) => (
          <FilterGroup
            key={key}
            objKey={key}
            values={values}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        ))}
      </fieldset>
    </div>
  );
};

const FilterGroup = ({
  objKey,
  values,
  filterOptions,
  setFilterOptions,
}) => {
  const selectedValue = filterOptions?.[objKey] ?? "";

  const handleSelect = (event) => {
    const value = event.target.value;

    setFilterOptions((currentOptions) => {
      const nextOptions = {
        ...currentOptions,
      };

      if (nextOptions[objKey] === value) {
        delete nextOptions[objKey];
      } else {
        nextOptions[objKey] = value;
      }

      return nextOptions;
    });
  };

  return (
    <fieldset className={styles.filterGroup}>
      <legend>{formatLabel(objKey)}</legend>

      <div className={styles.options}>
        {values.map((value) => {
          const stringValue = String(value);
          const inputId = createInputId(objKey, stringValue);

          return (
            <label
              key={stringValue}
              htmlFor={inputId}
              className={`${styles.option} ${
                selectedValue === stringValue
                  ? styles.optionSelected
                  : ""
              }`}
            >
              <input
                type="checkbox"
                id={inputId}
                name={objKey}
                value={stringValue}
                checked={selectedValue === stringValue}
                onChange={handleSelect}
              />

              <span>{formatLabel(stringValue)}</span>
            </label>
          );
        })}
      </div>
      
    </fieldset>
  );
};

export default Filter;