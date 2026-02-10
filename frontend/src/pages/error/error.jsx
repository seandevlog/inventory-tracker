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
      setData(error.error?.message);
    } else if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        setStatus(error.response?.status);
        setData(error.response?.data?.error);
        return;
      }
      setStatus(error.response?.status);
      setData(error.response?.statusText);
    } else {
      setStatus(error.status);
      setData(error.data?.error);
    }
  }, [setStatus, error])

  return (
    <div className={styles.error}>
      <p>Oops! Something went wrong.</p>
      <p>{status}</p>
      <p>{data}</p>
      <button
        onClick={() => navigate(path.root, { replace: true })}
      >
        Go Home
      </button>
    </div>
  )
}

export default Error;