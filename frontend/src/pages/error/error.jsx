import * as React from 'react';
import styles from './error.module.css';
import { useRouteError, useNavigate, isRouteErrorResponse } from "react-router-dom";
import axios from 'axios';
import config from '@config';
const { path } = config;

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const [status, setStatus] = React.useState('');
  const [data, setData] = React.useState('');
  
  console.log(error)

  React.useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setStatus(error.status);
      setData(error.error?.message || String(error.error));
    } else if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        setStatus(error.response?.status);
        setData(error.response?.data?.error || String(error.response?.data));
        return;
      }
      setStatus(error.response?.status);
      setData(error.response?.statusText || String(error.response?.statusText));
    } else {
      setStatus(error.status || 'Unknown');
      setData(
        typeof error.data?.error === 'string'
        ? error.data.error
        : JSON.stringify(error.data?.error) || String(error)
      )
    }
  }, [error])

  return (
    <div className={styles.error}>
      <p>Oops! Something went wrong.</p>
      {status && <p>{status}</p>}
      {data && <p>{data}</p>}
      <button
        onClick={() => navigate(path.root, { replace: true })}
      >
        Go Home
      </button>
    </div>
  )
}

export default Error;