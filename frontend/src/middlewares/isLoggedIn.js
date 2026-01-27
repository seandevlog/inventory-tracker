import axios from "axios";
import { redirect } from "react-router-dom";

import config from '@config';
import { setToken } from "@stores/token";

const { server } = config;

export const isLoggedIn = async ({ context }) => {
  try {
    const { data } = await axios.get(`${server}/auth/refresh`, {
      withCredentials: true
    });
    setToken(data.accessToken ?? '')

    const { error } = data;
    if (error) {
      console.log(error);
      return;
    }
    return redirect('/dashboard');
  } catch (err) {
    return;
  }
} 

export default isLoggedIn;