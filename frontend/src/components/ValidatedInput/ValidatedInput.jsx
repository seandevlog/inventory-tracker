import * as React from 'react';
import { useActionData } from 'react-router-dom';
import styles from './validatedInput.module.css';

const ValidatedInput = ({ id, children, type, autoComplete, className, value, disabled, schema: Schema }) => {
  const actionData = useActionData(); 
  const { validationError: submitValidationError } = actionData ?? '';

  const [input, setInput] = React.useState(value ?? '');

  const [errorMessage, setErrorMessage] = React.useState('');
  const isFirstInputDone = React.useRef(false);

  const schema = Schema?.extract(id);

  React.useEffect(() => {
    // 1. When the input has been written on
    // 2. When it's not inputted yet and submit is done
    if (isFirstInputDone.current || (!isFirstInputDone.current && submitValidationError)) {
      const { error } = schema.validate(input);
      const { message } = error ?? '';
      setErrorMessage(message);
    }
  }, [submitValidationError, input, schema])

  const handleInput = (event) => {
    setInput(event.target.value)

    if (!isFirstInputDone.current) {
      isFirstInputDone.current = true
    }
  }  

  return (
    <div className={styles[className]}>
      <label htmlFor={id}>{children}</label>
      <span id="validation-error" className={errorMessage ? styles.errorPing : styles.validationError}>
        <p>{errorMessage}</p>
      </span>
      <input 
        id={id}
        name={isFirstInputDone ? id : ''}
        type={type}
        onChange={handleInput}
        autoComplete={autoComplete} 
        defaultValue={value} 
        disabled={disabled}
      />
    </div>
)
}

export default ValidatedInput;