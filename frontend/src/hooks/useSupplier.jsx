import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useSupplier = () => {
  const { token } = useContext(AppContext);

  const [supplier, setSuppliers] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${server}/${path.suppliers}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSuppliers(data.suppliers);
    })()
  }, [token])

  return [ supplier, setSuppliers ];
}

export default useSupplier;