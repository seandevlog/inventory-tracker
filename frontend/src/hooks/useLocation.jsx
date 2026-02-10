import { useContext, useEffect, useState } from "react"
import axios from "axios";

import config from '@config';

import AppContext from '@contexts/app.context';

const { server, path } = config;

const useLocation = () => {
  const { token } = useContext(AppContext);

  const [locations, setLocations] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${server}/${path.locations.relative}/`,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setLocations(data.locations);
    })()
  }, [token])

  return [ locations, setLocations ];
}

export default useLocation;