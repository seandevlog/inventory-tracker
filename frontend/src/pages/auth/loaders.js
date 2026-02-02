import axios from "axios";
import { redirect } from "react-router-dom";

import config from '@config';
import { setToken } from "@stores/token";

const { server } = config;

export const auth = async () => {
  try {
    const { data } = await axios.get(`${server}/auth/refresh`, {
      withCredentials: true
    });
    setToken(data.accessToken ?? null)

    return redirect('/dashboard');
  } catch (err) {
    return;
  }
} 

export default auth;