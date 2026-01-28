import styles from './errorBox.module.css';

const ErrorBox = ({ children }) => {
  return children && (
    <div
      className={styles.errorBox}
    >
      {children}
    </div>
  )
}

export default ErrorBox;