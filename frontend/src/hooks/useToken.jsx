import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { getToken, setToken as setTokenState } from '@stores/token';

import config from "@config";
const { server, path } = config;

const useToken = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    if (typeof getToken() !== 'undefined' || getToken() !== null || getToken() !== '') (async() => {
      try {
        const { data } = await axios.get(`${server}/auth/refresh`, {
          withCredentials: true
        })
        setToken(data.accessToken);
        setTokenState(data.accessToken);
        return 
      } catch (err) {
        console.log(err);
        return navigate(path.root);
      }
    })()
  }, [navigate])

  return { token }
}

export default useToken;