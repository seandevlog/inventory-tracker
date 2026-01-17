import styles from './Error.module.css';
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.error}>
        <p>Oops! Something went wrong.</p>
        <p>Error: {error.status}</p>
        <p>{error.data}</p>
      </div>
    )
  } else {
    return (
      <div className={styles.error}>
        <p>Oops! Something went wrong.</p>
        <p>Error: unknown</p>
        <p>{error.data}</p>
      </div>
    )
  }
}

export default Error;