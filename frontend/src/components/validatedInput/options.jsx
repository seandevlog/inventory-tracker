import { useState, useEffect } from 'react';
import { useActionData, useOutletContext, useParams } from 'react-router-dom';
import { filter } from 'lodash';
import styles from './options.module.css';

import ErrorCircle from '@assets/errorCircle.svg';
import firstCharUppercase from '@utils/firstCharUppercase';
import splitUppercase from '@utils/splitUppercase';

const OptionInput = ({ id, label, type, schema, options, disabled }) => {
  const actionData = useActionData();
  const { validationError: submitValidationError } = actionData ?? '';

  const { data: groupData } = useOutletContext();
  const params = useParams();
  const paramId = params ? Object.values(params)?.[0] : '';
  const [ data ] = filter(groupData, { _id: paramId });
  const value = data ? data?.[`${id}`] : '';


  const [input, setInput] = useState(value ?? '');

  const [errorMessage, setErrorMessage] = useState('');
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // 1. When the input has been written on
    // 2. When it's not filled yet and submit is done
    if (isFilled || (!isFilled && submitValidationError)) {
      const { error } = schema.validate(input);
      const { message } = error ?? '';
      setErrorMessage(message);
    }
  }, [submitValidationError, input, schema, isFilled])

  const handleInput = (event) => {
    setInput(event.target.value)

    if (!isFilled) {
      setIsFilled(true)
    }
  } 

  return (
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
}

export default OptionInput;