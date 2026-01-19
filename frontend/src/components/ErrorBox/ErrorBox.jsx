import styles from './ErrorBox.module.css';

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