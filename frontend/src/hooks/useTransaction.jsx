import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useTransaction = () => {
  const { token } = useContext(AppContext);

  const [transaction, setTransactions] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${server}/${path.transactions}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setTransactions(data.transactions);
    })()
  }, [token])

  return [ transaction, setTransactions ];
}

export default useTransaction;