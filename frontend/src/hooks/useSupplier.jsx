import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useSupplier = ({ refreshKey, token = null}) => {
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data } = await axios.get(`${server}/${path.suppliers.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuppliers(data.suppliers);
    })()
  }, [token, refreshKey])

  return suppliers;
}

export default useSupplier;