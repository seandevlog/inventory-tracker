import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useOrder = () => {
  const { token } = useContext(AppContext);

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${server}/${path.orders.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrders(data.orders);
    })()
  }, [token])

  return [ orders, setOrders ];
}

export default useOrder;