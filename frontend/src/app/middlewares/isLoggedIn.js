import axios from "axios";
import { redirect } from "react-router-dom";

import config from '@config';
import { setToken } from "@stores/token";

const { server } = config;

export const isLoggedIn = async ({ context }, next) => {
  try {
    const { data } = await axios.get(`${server}/auth/refresh`, {
      withCredentials: true
    });
    setToken(data.accessToken ?? '')

    const { error } = data;
    if (error) throw new Error(error); 
    return redirect('/dashboard');
  } catch (err) {
    return next();
  }
} 

export default isLoggedIn;