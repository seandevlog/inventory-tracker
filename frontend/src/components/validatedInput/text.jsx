import styles from './text.module.css';

const TextInput = ({ id, label, type, autoComplete, disabled, errorMessage, handleInput, isFilled, value }) => (
  <div className={styles.text}>
    <label htmlFor={id}>{label}</label>
    {errorMessage &&
      <span id="validation-error">
        <p>{errorMessage}</p>
      </span>
    }
    <input 
      id={id}
      name={isFilled ? id : ''}
      type={type}
      onChange={handleInput}
      autoComplete={autoComplete || ''} 
      defaultValue={value} 
      disabled={disabled}
    />
  </div>
)


export default TextInput;