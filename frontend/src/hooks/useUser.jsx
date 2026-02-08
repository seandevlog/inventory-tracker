import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useUser = () => {
  const { token, profile } = useContext(AppContext);
  const { role } = profile || {};

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (role === 'admin') {
      (async () => {
        const { data } = await axios.get(`${server}/${path.users}/`,{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUsers(data.users);
      })()
    }
  }, [token, role])

  return [ users, setUsers ];
}

export default useUser;