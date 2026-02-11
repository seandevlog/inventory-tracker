import { useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

const { server, path } = config;

const useLocation = ({ refreshKey, token = null}) => {
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      const { data } = await axios.get(`${server}/${path.locations.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setLocations(data.locations);
    })()
  }, [token, refreshKey])

  return locations;
}

export default useLocation;