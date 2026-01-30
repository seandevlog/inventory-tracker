import styles from './input.module.css';

const DateInput = ({ id, label, disabled, errorMessage, handleInput, isFilled, value }) => (
  <div className={styles.date}>
    <label htmlFor={id}>{label}</label>
    {errorMessage &&
      <span id="validation-error">
        <p>{errorMessage}</p>
      </span>
    }
    <input 
      id={id}
      name={isFilled ? id : ''}
      type='text'
      onChange={handleInput}
      defaultValue={new Date(value).toLocaleDateString(undefined, { 
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        minute: '2-digit',
        hour: '2-digit'
      })} 
      disabled={disabled}
    />
  </div>
)


export default DateInput;