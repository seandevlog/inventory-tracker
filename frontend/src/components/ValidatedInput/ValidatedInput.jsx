import * as React from 'react';
import styles from './ValidatedInput.module.css';

const ValidatedInput = ({ id, children, type, autoComplete, className, value, disabled, schema: Schema }) => {
  const [input, setInput] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState('');
  const isFirstInputDone = React.useRef(false);

  const schema = Schema.extract(id);

  React.useEffect(() => {
    if (isFirstInputDone.current) {
      setErrorMessage((schema.validate(input)).error?.message)
    }
  }, [input, schema])

  const handleInput = (event) => {
    setInput(event.target.value)

    if (!isFirstInputDone.current) {
      isFirstInputDone.current = true
    }
  }  

  return (
    <div className={styles[className]}>
      <label htmlFor={id}>{children}</label>
      <span id="validation-error" className={styles.validationError}>
        <p>{errorMessage}</p>
      </span>
      <input 
        id={id}
        name={id}
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