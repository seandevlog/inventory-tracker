import styles from './errorBox.module.css';

const ErrorBox = ({ className, children }) => {
  return children && (
    <div
      className={styles[className]}
    >
      {children}
    </div>
  )
}

export default ErrorBox;