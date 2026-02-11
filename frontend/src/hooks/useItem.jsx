import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useItem = ({ refreshKey, token = null}) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data } = await axios.get(`${server}/${path.items.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setItems(data.items);
    })()
  }, [token, refreshKey])

  return items;
}

export default useItem;