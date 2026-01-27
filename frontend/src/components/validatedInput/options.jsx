import styles from './options.module.css';

import ErrorCircle from '@assets/errorCircle.svg';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

const OptionInput = ({ id, label, type, options, disabled, errorMessage, handleInput, isFilled, value }) => (
  <div className={styles.options}>
    <fieldset>
      <legend></legend>
      <div>
        <label htmlFor={id}>{splitUppercase(firstCharUppercase(label))}</label>
        <select
          id={id}
          name={isFilled ? id : ''}
          type={type}
          onChange={handleInput} 
          disabled={disabled}
          defaultValue={value}
        >
          <option value=''>--Choose One--</option>
          {options.map(option => (
            <option 
              key={option} 
              value={option}
            >
              {firstCharUppercase(option)}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
    {errorMessage &&
      <ErrorCircle />
    }
  </div>
)

export default OptionInput;