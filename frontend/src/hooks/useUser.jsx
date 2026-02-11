import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useUser = ({ refreshKey, profile = {}, token = null }) => {
  const { role } = profile || {};

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (!token) return;

    if (role === 'admin') {
      (async () => {
        const { data } = await axios.get(`${server}/${path.users.relative}/`,{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setUsers(data.users);
      })()
    }
  }, [token, role, refreshKey])

  return users;
}

export default useUser;