import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useOrder = ({ refreshKey, token = null}) => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data } = await axios.get(`${server}/${path.orders.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setOrders(data.orders);
    })()
  }, [token, refreshKey])

  return orders;
}

export default useOrder;