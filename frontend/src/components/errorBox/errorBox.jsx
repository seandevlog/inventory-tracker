import styles from './errorBox.module.css';

const ErrorBox = ({ children }) => {
  return (
    <div
      className={styles.errorBox}
    >
      {children}
    </div>
  )
}

export default ErrorBox;
