import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useTransaction = ({ refreshKey, token = null}) => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data } = await axios.get(`${server}/${path.transactions.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTransactions(data.transactions);
    })()
  }, [token, refreshKey])

  return transactions;
}

export default useTransaction;