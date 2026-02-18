import { useEffect, useState } from "react";

import axios from "axios";

import { getToken, setToken as setTokenState } from '@stores/token';

import config from "@config";
const { server } = config;

const useToken = ({ refreshKey }) => {
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    if (token) return; 
    (async() => {
      try {
        const { data } = await axios.get(`${server}/auth/refresh`, {
          withCredentials: true
        })
        setToken(data.accessToken);
        setTokenState(data.accessToken);
        return 
      } catch (err) {
        ;
      }
    })()
  }, [refreshKey, token])

  return { token }
}

export default useToken;