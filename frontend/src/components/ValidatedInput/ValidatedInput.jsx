import styles from './ValidatedInput.module.css';

const ValidatedInput = ({ id, children, type, autoComplete, className }) => {
  // const [value, setValue] = React.useState('');

  return (
    <div className={styles[className]}>
      <label htmlFor={id}>{children}</label>
      <span id="validation-error" className={styles.validationError}></span>
      <input type={type} id={id} name={id} autoComplete={autoComplete} defaultValue=""/>
    </div>
  )
}

export default ValidatedInput;