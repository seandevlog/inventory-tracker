import axios from 'axios';
import config from '@config';

const server = `${config.server}/auth/`;

export const login = async ( formData ) => {
  try {
    const { data } = await axios.post(`${server}login`, formData, {
      withCredentials: true
    });
    return data;
  } catch (err) {
    return { error: err }
  }
}

export const register = async ( formData ) => {
  const { data } = await axios.post(`${server}register`, formData);

  return data;
}

export const logout = async () => {
  const res = await axios.delete(`${server}logout`, {
    withCredentials: true
  });

  if (res.status < 400) {
    return { success: true }
  }
  
  return { error: res.data?.error }
}