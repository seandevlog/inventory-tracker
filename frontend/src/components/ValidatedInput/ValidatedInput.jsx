import * as React from 'react';
import { useActionData } from 'react-router-dom';
import styles from './validatedInput.module.css';

const ValidatedInput = ({ id, label, type, autoComplete, className, value, disabled, schema: Schema }) => {
  const actionData = useActionData();
  const { validationError: submitValidationError } = actionData ?? '';

  const [input, setInput] = React.useState(value ?? '');

  const [errorMessage, setErrorMessage] = React.useState('');
  const [isFilled, setIsFilled] = React.useState(false);

  const schema = Schema?.extract(id);

  React.useEffect(() => {
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
    <div className={styles[className]}>
      <label htmlFor={id}>{label}</label>
      <span id="validation-error" className={errorMessage ? styles.errorPing : styles.validationError}>
        <p>{errorMessage}</p>
      </span>
      <input 
        id={id}
        name={isFilled ? id : ''}
        type={type}
        onChange={handleInput}
        autoComplete={autoComplete} 
        defaultValue={value} 
        disabled={disabled}
        className={styles[`${className}`]}
      />
    </div>
)
}

export default ValidatedInput;