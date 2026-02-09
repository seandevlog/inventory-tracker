import axios from "axios";
import config from '@config';
import { getToken, setToken } from '@stores/token';
import { redirect } from "react-router-dom";

const { server } = config;

export const loader = async () => {
  if (getToken()) return { token : getToken() };

  try {
    const { accessToken } = await axios.get(`${server}/auth/refresh`, {
      withCredentials: true
    });

    setToken(accessToken);
    return { token : accessToken };
  } catch (err) {
    console.log(err);
    return redirect('/');
  }
}