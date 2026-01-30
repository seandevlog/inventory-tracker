import styles from './input.module.css';

const TextInput = ({ id, label, type, autoComplete, disabled, errorMessage, handleInput, isFilled, value, defaultValue }) => (
  <div className={styles.text}>
    <label htmlFor={id}>{label}</label>
    {errorMessage &&
      <span id="validation-error">
        <p>{errorMessage}</p>
      </span>
    }
    <input 
      id={id}
      name={(isFilled || !!defaultValue) ? id : ''}
      type={type}
      onChange={handleInput}
      autoComplete={autoComplete || 'off'} 
      defaultValue={defaultValue || value} 
      disabled={disabled}
      readOnly={!!defaultValue}
    />
  </div>
)


export default TextInput;