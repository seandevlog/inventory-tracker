import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useTransaction = ({ refreshKey }) => {
  const { token } = useContext(AppContext);

  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
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